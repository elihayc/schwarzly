'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const { Platform, StyleSheet, Text, View} = ReactNative;

class StatusBar extends Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>{this.props.title}</Text>
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
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: "500",
    textAlign: 'center'
  },
});

module.exports = StatusBar;
