import React, {Component} from 'react';
import ReactNative from 'react-native';
import Dialog from 'react-native-dialog';

const sharedStyles = require('../styles/styles.js')
const { Platform, StyleSheet, View, Image, Button, TouchableOpacity, Text } = ReactNative;


class ListItem extends Component {

  _getUserStatusLine()
  {
    var defaultText = "What's in your mind?";
    return (this.props.user.statusLine == null && this.props.user.attending != null) ?
      (<Text style={{color: "gray"}}>{defaultText}</Text>) :
      (<Text style={{color: "gray"}}>{this.props.user.statusLine}</Text>);

  }

  _buttonTextClass(buttonValue){
    return (buttonValue == this.props.user.attending) ? styles.selectedButtonText : styles.buttonText;
  }

  _getStatusIconUri(userAttendingValue){
    switch (userAttendingValue) {
      case "Attending":
        return require("../../resources/football.png");
        break;
      case "Not Attending":
        return require("../../resources/house.png");
        break;
      default:
        return null;
    }

  }

  _showStatusLineAlert(){
    Dialog.prompt(this.props.user.firstName +" " + this.props.user.lastName  , "what's on your mind?", [
        {text: 'OK', onPress: (promptValue)=> this.props.onStatusLineChange(this.props.user,promptValue), style: 'default'},
        {text: 'Cancel', onPress: null, style: 'destructive'},
      ]  ,
      undefined
    );
  }
  _showAttendingAlert(){
    var arr = ["Attending", "Not Attending", "Clear"];

    Dialog.showActionSheetWithOptions({
                    options: arr,
                    cancelButtonIndex: arr.length - 1,
                    destructiveButtonIndex: arr.length - 1,
                },
                (buttonIndex) => {
                    this.props.onAttendingChange(this.props.user, arr[buttonIndex]);
                });
  }

  // <TouchableOpacity onPress={()=> this._showStatusLineAlert()} >
  //   {this._getUserStatusLine()}
  // </TouchableOpacity>
  render() {
    return (
      <TouchableOpacity onPress={()=> this._showAttendingAlert()} >

        <View style={styles.li}>

            <View style={styles.leftView}>
                  <Image
                      style={{width: 50, height: 50, borderRadius: 25}}
                      source={{uri: this.props.user.imageUrl}}
                  />
            </View>

            <View style={styles.centerView}>
              <Text style={styles.liText}>{this.props.user.firstName} {this.props.user.lastName}</Text>
            </View>

            <View style={styles.rightView}>
                <Image
                    style={{width: 50, height: 50, borderRadius: 0}}
                    source={this._getStatusIconUri(this.props.user.attending)}
                />
            </View>
        </View>
      </TouchableOpacity>

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
    flex:0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  centerView: {
    flexDirection: 'column',
    flex:0.6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  rightView: {
    flexDirection:'row',
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },

});
module.exports = ListItem;
