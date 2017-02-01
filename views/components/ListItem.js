import React, {Component} from 'react';
import ReactNative from 'react-native';

const sharedStyles = require('../styles/styles.js')
const { StyleSheet, View, Image, Button, TouchableHighlight, Text } = ReactNative;


class ListItem extends Component {
  _isAttending(attendingValue){
    return (attendingValue != null) ? attendingValue : 'Pending'
  }

  _buttonSelectionClass(buttonValue){
    return (buttonValue == this.props.user.attending) ? styles.selectedButton : styles.unSelectedButton;
  }

  _buttonTextClass(buttonValue){
    return (buttonValue == this.props.user.attending) ? styles.selectedButtonText : styles.buttonText;
  }

  render() {
    return (
      <View style={styles.li}>
        <View style={styles.leftView}>
            <View style={styles.userDetailsView}>
              <Image
                  style={{width: 50, height: 50, borderRadius: 25}}
                  source={{uri: this.props.user.imageUrl}}
              />
            </View>
            <Text style={styles.liText}>     {this.props.user.firstName}</Text>

        </View>
        <View style={styles.rightView}>
            <TouchableHighlight
              style={[styles.button, this._buttonSelectionClass('Attending')]}
              onPress={()=> this.props.onPress(this.props.user, "Attending")}
              underlayColor='#fff' >
                <Text style={this._buttonTextClass('Attending')}>    V    </Text>
            </TouchableHighlight>


            <TouchableHighlight
              style={[styles.button, this._buttonSelectionClass('NotAttending')]}
              onPress={()=> this.props.onPress(this.props.user, "NotAttending")}
              underlayColor='#fff' >
                <Text style={this._buttonTextClass('NotAttending')}>    X    </Text>
            </TouchableHighlight>
        </View>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  li: {
    flexDirection:'row',
    backgroundColor: '#fff',
    borderBottomColor: '#DDDDDD',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  leftView: {
    flexDirection: 'row',
    flex:0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightView: {
    flexDirection:'row',
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  userDetailsView: {
    alignItems: 'center',
  },
  button: {
    marginRight:5,
    marginLeft:5,
    paddingLeft:5,
    paddingRight:5,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'white',
    borderRadius:0,
    borderWidth: 1,
    borderColor: 'rgb(22,146,77)'
  },
  selectedButton: {
    backgroundColor:'rgb(22,146,77)',
  },
  unSelectedButton: {
    backgroundColor:'white',
  },
  buttonText:{
    color: 'rgb(22,146,77)'
  },
  selectedButtonText:{
    color: 'white'
  }

});
module.exports = ListItem;
