import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


class EventListItem extends Component {
  render() {
    return (
      <View style={styles.li}>
        <Text style={styles.liText}>{this.props.event.date}</Text>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  li: {
    flexDirection:'row',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#DDDDDD',
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },

});

module.exports = EventListItem;
