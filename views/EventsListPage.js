'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  Button
} from 'react-native';

import FireBaseManager from './../BL/FireBaseManager.js'
import Dialog from 'react-native-dialog';

var Modal = require('react-native-modalbox');

const StatusBar = require('./components/StatusBar');
const EventListItem = require('./eventsComponents/EventListItem');
const EditEventView = require('./eventsComponents/EditEventView');

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

  openAddEventModal(user) {
    this.setState({isOpen: true});
  }

  closeAddEventModal(user) {
    this.setState({isOpen: false});
  }

  addEvent(eventId, eventDate){
    this.closeAddEventModal();

    this.fireBaseMgr.addEvent(eventId, eventDate)
  }

  deleteEvent(event){
    var arr = ["Delete", "Cancel"];

    Dialog.showActionSheetWithOptions({
                    options: arr,
                    cancelButtonIndex: arr.length - 1,
                    destructiveButtonIndex: arr.length - 1,
                },
                (buttonIndex) => {
                  if (buttonIndex == 0){
                      this.fireBaseMgr.deleteEvent(event.id);
                  }
                });
  }

  listenForEvents(){
    // Load and listen to the events
    this.fireBaseMgr.eventsRef.limitToFirst(50).orderByKey().on('value',(snap) =>{
        // var eventId = Object.keys(snap.val())[0];
        // var eventData = snap.val()[eventId];
        var events = [];
        snap.forEach((child) => {
          let event = child.val();
          events.push({
              date: event.date,
              id: event.id,
              users: event.users
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
      <EventListItem event={event}
        onDeleteEvent={this.deleteEvent.bind(this)}/>
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
            <Button
              onPress={() => this.openAddEventModal()}
              title="Add Event"
              color="#841584"
            />

            <Modal style={{height:400}}
                    backButtonClose={true}  position={"center"} isOpen={this.state.isOpen}
                    onClosed={() => this.closeAddEventModal()}
            >
              <EditEventView onEditEventCompleted={this.addEvent.bind(this)}/>
            </Modal>

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
