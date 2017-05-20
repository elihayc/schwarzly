'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import Drawer from 'react-native-drawer';
import Dialog from 'react-native-dialog';

import FBManager from './../BL/FBManager.js'

const PlayersListPage = require('./PlayersListPage')
const EventsListPage = require('./EventsListPage')

const PLAYERS_LIST_SCREEN_NAME = "PLAYER_LIST_SCREEN_NAME"
const EVENTS_LIST_SCREEN_NAME = "EVENTS_LIST_SCREEN_NAME"

class MainContainerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      currentScreen: PLAYERS_LIST_SCREEN_NAME
    };

    this.fbManager = new FBManager();
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

  openControlPanel() {
    this.setState({isDrawerOpen:true});
  }

  _renderLeftMenu(){
    return(<View style={styles.leftMenuView}>
            <Button onPress={() => this.setState({currentScreen:PLAYERS_LIST_SCREEN_NAME, isDrawerOpen:false})} title="CurrentEvent" />
            <Button onPress={() => this.setState({currentScreen:EVENTS_LIST_SCREEN_NAME, isDrawerOpen:false})} title="All Events" />
            <Button onPress={() => this.logout()} title="Logout" />
            </View>
    );
  }

  _renderMainView(){
    switch (this.state.currentScreen) {
      case PLAYERS_LIST_SCREEN_NAME:
        return(<PlayersListPage onLogedOut={this.logout.bind(this)} openMenu={this.openControlPanel.bind(this)} />)
        break;
      case EVENTS_LIST_SCREEN_NAME:
        return(<EventsListPage onLogedOut={this.logout.bind(this)} openMenu={this.openControlPanel.bind(this)} />)
        break;
      default:
        return(<PlayersListPage onLogedOut={this.logout.bind(this)} openMenu={this.openControlPanel.bind(this)} />)
    }
  }

  render() {
    return (
      <Drawer
        open={this.state.isDrawerOpen}
        tapToClose={true}
        openDrawerOffset={0.4} // 40% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        content={this._renderLeftMenu()}
        >
          <View style={styles.container}>
            {this._renderMainView()}
          </View>
      </Drawer>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftMenuView: {
    alignItems: 'flex-start',
  }
});

module.exports = MainContainerPage;
