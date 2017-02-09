'use strict';

import React, { Component } from 'react'
import update from 'immutability-helper';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native'

// Using for date format
import moment from 'moment';

import FireBaseManager from './../BL/FireBaseManager.js'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton
} = FBSDK;

const StatusBar = require('./components/StatusBar');
const ListItem = require('./components/ListItem');
const SectionHeader = require('./components/SectionHeader');


class PlayersListPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {dataSource: ds};

    this.fireBaseMgr = new FireBaseManager();
  }

  componentDidMount() {
    // this.listenForItems(this.fireBaseMgr.usersRef);
    var eventAfterDate = moment(new Date()).format('YYYY-MM-DD');
    this.loadUsersAndListenForEvents(eventAfterDate);
  }

  getUsersWithUnkwonStatus(allUsers, eventUsers){
    var unknownStatusUsers = Object.keys(allUsers).reduce(function (filtered, key) {
        if (eventUsers == null || eventUsers[key] == null) filtered.push(allUsers[key]);
        return filtered;
    }, []);

    return unknownStatusUsers;
  }

  loadUsersAndListenForEvents(eventAfterDate){
      // Load all users once
      this.fireBaseMgr.usersRef.once('value',(snap) =>{
          this.users = snap.val();

          // Load and listen to the events
          this.fireBaseMgr.eventsRef.startAt(eventAfterDate).limitToFirst(1).orderByKey().on('value',(snap) =>{
              var eventId = Object.keys(snap.val())[0];
              var eventData = snap.val()[eventId];

              // Create sectionsData
              var sectionsData = {Attending:[], "Not Attending":[], Maybe:[]};

              // Reset Counters
              var attendingCount = 0;

              if (eventData['users'] != null){
                Object.keys(eventData['users']).forEach((user)=> {
                  if (eventData['users'][user].attending == "Attending") {
                    attendingCount++;//TODO: delete attendingCount
                    sectionsData['Attending'].push(eventData['users'][user]);
                  }
                  else if (eventData['users'][user].attending == "Not Attending"){
                    sectionsData['Not Attending'].push(eventData['users'][user]);
                  }
                  else{
                    sectionsData['Maybe'].push(eventData['users'][user]);
                  }
                })
              }

              sectionsData['Pending'] = this.getUsersWithUnkwonStatus(this.users, eventData['users']);

              // Refresh the state and screen
              this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(sectionsData),
                eventDate: eventData['date'],
                eventId: eventId,
                attendingCount: attendingCount
              });
          });
      });
  }

  setAttending(user, attendingStatus){
    // Delete Pending users
    if (attendingStatus == "Delete"){
      this.fireBaseMgr.deleteUserFromEvent(this.state.eventId, user);
    }
    else{
      var cloneUser = update(user, {$merge:{'attending':attendingStatus}});
      // cloneUser.userSatusLine = userSatusLine;

      this.fireBaseMgr.setUserInEvent(this.state.eventId, cloneUser);
    }
  }

  setUserStatusLine(user, statusLine)
  {
    var cloneUser = update(user, {$merge:{'statusLine':statusLine}});

    this.fireBaseMgr.setUserInEvent(this.state.eventId, cloneUser);
  }

  _renderItem(user) {
    return (
      <ListItem user={user}
          onAttendingChange={this.setAttending.bind(this)}
          onStatusLineChange={this.setUserStatusLine.bind(this)} />
    );
  }
  _renderSectionHeader(sectionData, category){
    return (
      <SectionHeader sectionData={sectionData} category={category} />
    );
  }

  titleText(){
    return (this.state.eventDate != null) ? this.state.eventDate :'loading...'
  }

  render(){

    return(
      <View style={styles.container}>
        <StatusBar title={this.titleText()}  />

        <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          style={styles.listView}
        />

        <View style={styles.logoutButton}>
          <LoginButton
            onLogoutFinished={() => this.props.onLogedOut(false)}
          />
        </View>
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
  listView: {
    flex: 1
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  logoutButton:{
    flex: 0.1,
    alignItems: 'center',
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

module.exports = PlayersListPage;
