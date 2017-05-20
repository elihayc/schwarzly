'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

import FireBaseManager from './../BL/FireBaseManager.js'

const StatusBar = require('./components/StatusBar');
const EventListItem = require('./eventsComponents/EventListItem');

class EventsListPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {dataSource: ds};
    this.fireBaseMgr = new FireBaseManager();
  }

  componentDidMount() {
    this.listenForEvents();
  }

  listenForEvents(){
    // Load and listen to the events
    this.fireBaseMgr.eventsRef.limitToFirst(50).orderByKey().on('value',(snap) =>{
        // var eventId = Object.keys(snap.val())[0];
        // var eventData = snap.val()[eventId];
        var events = [];
        snap.forEach((child) => {
          events.push({
              date: child.val().date,
            });
        });

        // Refresh the state and screen
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(events),
        });
    });
  }

  _renderItem(event) {
    return (
      <EventListItem event={event}/>
    );
  }

  render() {
    return (
            <View style={styles.container}>
            <StatusBar title="Events" subtitle="A" menuPressed={() => this.props.openMenu()}
              isAdminUser={false} editOthersPressed={null}
            />

            <ListView dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              style={styles.listView}
            />

          </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    alignSelf: 'stretch',
  },
  listView:{

  }
});

module.exports = EventsListPage;
