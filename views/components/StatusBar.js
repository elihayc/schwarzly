'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const { Platform, StyleSheet, Text, View, TouchableHighlight, Image} = ReactNative;

class StatusBar extends Component {

  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>

          <TouchableHighlight style={styles.menuView} onPress={() => this.props.menuPressed()}>
            <Image style={styles.menuImage} source= {require("../../resources/menu.png")} />
          </TouchableHighlight>

          <View style={styles.titleView}>
            <Text style={styles.navbarTitle}>{this.props.title}</Text>
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
    width: 50
  },
  titleView:{
    flex:1,
    paddingRight:50
  },
  menuImage:{
    height: 50,
    width: 50
  },
  navbarTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center'
  },
});

module.exports = StatusBar;
