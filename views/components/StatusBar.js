'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const { Platform, StyleSheet, Text, View, TouchableHighlight, Image} = ReactNative;

import renderIf from './../../helpers/renderif.js'

class StatusBar extends Component {

  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>

          <TouchableHighlight style={styles.menuView} onPress={() => this.props.menuPressed()}>
            <Image style={styles.menuImage} source= {require("../../resources/logout.png")} />
          </TouchableHighlight>

          <View style={styles.titleView}>
            <Text style={styles.navbarTitle}>{this.props.title}</Text>
          </View>

          <View style={styles.editButtonView} >
              {renderIf(this.props.isAdminUser)(
              <TouchableHighlight
              onPress={() => this.props.editOthersPressed()}>
              <Image style={{height: 30,width: 30}} source= {require("../../resources/edit.png")} />
              </TouchableHighlight>
              )}
          </View>

        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  statusbar: {
    backgroundColor: '#fff',

    ...Platform.select({
      ios: {
        height: 22,
      },
      android: {
        height: 0,
      },
    }),
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#16924D',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'flex-start',
    height: 64,
    flexDirection: 'row'
  },
  menuView:{
    height: 50,
    width: 50,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  menuImage:{
    height: 25,
    width: 25,
    marginLeft: 10
  },
  editButtonView:{
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView:{
    flex:1,
  },
  navbarTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center'
  },
});

module.exports = StatusBar;
