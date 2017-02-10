'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  View,
  Text,
} from 'react-native';

import codePush from "react-native-code-push";

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken
} = FBSDK;

const LoginPage = require('./views/LoginPage');
// var LoginFB = require('./views/LoginFB');
const PlayersListPage = require('./views/PlayersListPage')

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class schwarzly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: false,
      isLoading: true
    };
  }

  updateIsLogedIn(value)
  {
    this.setState({ isLogedIn: value });
  }

  render() {
    console.log("render main screen");
    // console.log(AccessToken.getCurrentAccessToken().toString());

    if (this.state.isLoading){
        AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        if(data != null){
                          // alert(data.accessToken.toString())
                          this.setState({ isLogedIn: true });
                        }
                        else {
                          // alert("none")
                          this.setState({ isLogedIn: false });
                        }

                      });
      this.state.isLoading = false;
    }

    if(this.state.isLoading){
      return (
      <View style={styles.container}>
      </View>
      );
    }
    else if (!this.state.isLogedIn){
      return (
      <View style={styles.container}>
      <LoginPage onLogedIn={this.updateIsLogedIn.bind(this)} />
      </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
        <PlayersListPage onLogedOut={this.updateIsLogedIn.bind(this)}/>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('schwarzly', () => schwarzly);
schwarzly = codePush(schwarzly);
