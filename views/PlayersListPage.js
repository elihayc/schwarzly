'use strict';

import React, { Component } from 'react'
import update from 'immutability-helper';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Button
} from 'react-native'

// Using for date format
import moment from 'moment';

import FireBaseManager from './../BL/FireBaseManager.js'
import FBManager from './../BL/FBManager.js'
import Dialog from 'react-native-dialog';


var Modal   = require('react-native-modalbox');

const StatusBar = require('./components/StatusBar');
const ListItem = require('./components/ListItem');
const SectionHeader = require('./components/SectionHeader');
const EditUserView = require('./components/EditUserView');


class PlayersListPage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {dataSource: ds, editOthers:false};

    this.fireBaseMgr = new FireBaseManager();
    this.fbManager = new FBManager();

    this.fbManager.getUserId().then(
      (userId) => {
        this.state.userId = userId;
      });
  }

  componentDidMount() {
    this.loadDataSource();
  }

  getUsersWithUnkwonStatus(allUsers, eventUsers){
    var unknownStatusUsers = Object.keys(allUsers).reduce(function (filtered, key) {
        if (eventUsers == null || eventUsers[key] == null) filtered.push(allUsers[key]);
        return filtered;
    }, []);

    return unknownStatusUsers;
  }

  loadDataSource(){
    var eventAfterDate = moment(new Date()).format('YYYY-MM-DD');
    this.loadUsersAndListenForEvents(eventAfterDate);
  }

  loadUsersAndListenForEvents(eventAfterDate){
      ///TODO - debug trick !!!!!!
      ///eventAfterDate = '2017-03-01';

      // Load all users once
      this.fireBaseMgr.usersRef.once('value',(snap) =>{
          this.users = snap.val();

          // Load and listen to the events
          this.fireBaseMgr.eventsRef.startAt(eventAfterDate).limitToFirst(1).orderByKey().on('value',(snap) =>{
              var eventId = Object.keys(snap.val())[0];
              var eventData = snap.val()[eventId];

              // Create sectionsData the key order will be the sections order in the list view
              var sectionsData = {Attending:[], "Not Attending":[], Maybe:[]};

              // Reset Counters
              var attendingCount = 0;

              if (eventData['users'] != null){
                Object.keys(eventData['users']).forEach((user)=> {
                  if (eventData['users'][user].attending == "Attending" || eventData['users'][user].attending == "Attending + Carpool" ) {
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

              // Delete empty keys from the Dictionary, because it causes a warning
              for(var key in sectionsData) {
                if(sectionsData[key].length == 0) {
                  delete sectionsData[key];
                }
              }

              // Refresh the state and screen
              this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(sectionsData),
                eventDate: eventData['date'],
                eventUsers: eventData['users'],
                eventId: eventId,
                attendingCount: attendingCount
              });
          });
      });
  }

  setAttendingAndStatusLine(user, attendingStatus, userSatusLine){

    this.setState({isOpen: false});

    // Delete Pending users
    if (attendingStatus == "Clear"){
      this.fireBaseMgr.deleteUserFromEvent(this.state.eventId, user);
    }
    else{
      var cloneUser = update(user, {$merge:{'attending':attendingStatus}});
      if (userSatusLine != null){
        cloneUser.userStatusLine = userSatusLine;
      }

      this.fireBaseMgr.setUserInEvent(this.state.eventId, cloneUser);
    }
  }

  editOthersPressed(){
    var newValue = !this.state.editOthers;
    this.setState({editOthers:newValue})

    this.loadDataSource();
  }

  logout()
  {
    var arr = ["Log Out", "Cancel"];

    Dialog.showActionSheetWithOptions({
                    options: arr,
                    cancelButtonIndex: arr.length - 1,
                    destructiveButtonIndex: arr.length - 1,
                },
                (buttonIndex) => {
                  if (buttonIndex == 0){
                    this.fbManager.logout();
                    this.props.onLogedOut(false)
                  }
                });
  }

  getCurrentUser(){
    // Get the User from the Users table
    var user = (this.state.userId) == null ? null : this.users[this.state.userId];

    if (user != null){
      // Override the user if he exist in the current event - the event extends the user attending status.
      if (this.state.eventUsers != null && this.state.eventUsers[this.state.userId] != null){
          user = this.state.eventUsers[this.state.userId];
      }
    }
    return user;
  }

  isAdminUser(user){
    return (user != null && user.admin == true);
  }

  titleText(){
    return (this.state.eventDate != null) ? this.state.eventDate :'loading...'
  }

  openEditModal(user) {
    this.setState({editUser:user, isOpen: true});
  }

  closeEditModal(user) {
    this.setState({isOpen: false});
  }

  _renderItem(user) {
    return (
      <ListItem user={user}
          disabled={!this.state.editOthers}
          onEditPressed={this.openEditModal.bind(this)}
      />
    );
  }
  _renderSectionHeader(sectionData, category){
    return (
      <SectionHeader sectionData={sectionData} category={category} />
    );
  }
  
  _renderCurrentUserStatus(){
    var user = this.getCurrentUser();

    if (user != null){
      return (
        <ListItem user={user}
            disabled={false}
            onEditPressed={this.openEditModal.bind(this)}
        />
      );
    }
    else {
      return null;
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar title={this.titleText()} menuPressed={this.logout.bind(this)}
          isAdminUser={this.isAdminUser(this.getCurrentUser())} editOthersPressed={this.editOthersPressed.bind(this)}
        />

        <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          style={styles.listView}
        />


        <View style={styles.footer}>
          {this._renderCurrentUserStatus()}
        </View>

        <Modal style={{height: this.isAdminUser(this.getCurrentUser())? 350:300}}
                backButtonClose={true}  position={"center"} isOpen={this.state.isOpen}
                onClosed={() => this.closeEditModal()}
        >
          <EditUserView user={this.state.editUser} isAdminUser={this.isAdminUser(this.getCurrentUser())}
              onEditCompleted={this.setAttendingAndStatusLine.bind(this)} />
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
  listView: {
    flex: 1
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  footer:{
    flexDirection: 'column',
  },
  button: {
    height: 20,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
});

module.exports = PlayersListPage;
