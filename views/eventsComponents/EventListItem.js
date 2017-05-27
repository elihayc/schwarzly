import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// https://medium.com/@bddougie/adding-swipe-to-delete-in-react-native-cfa85a5f5a31
import Swipeout from 'react-native-swipeout';

class EventListItem extends Component {

  render() {
    // Buttons
    var swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.props.onDeleteEvent(this.props.event) }
      }];

    return (
      <Swipeout right={swipeBtns}
             autoClose={true}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.event.date}</Text>
        </View>
      </Swipeout>

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
