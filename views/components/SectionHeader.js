'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const { StyleSheet, Text, View} = ReactNative;

class SectionHeader extends Component {
  render() {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionHeaderText}>{this.props.category}</Text>
        <View>
          <Text style={styles.sectionHeaderText}>{this.props.sectionData.length}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  sectionView:{
    height:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  sectionHeaderText:{
    fontWeight: "700",
    fontSize: 16,
    color: '#666666',
    padding:5
  }
});

module.exports = SectionHeader;
