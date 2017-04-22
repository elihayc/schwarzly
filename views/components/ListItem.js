import React, {Component} from 'react';
import ReactNative from 'react-native';
// import Dialog from 'react-native-dialog';

const sharedStyles = require('../styles/styles.js')
const { Platform, StyleSheet, View, Image, Button, TouchableOpacity, Text } = ReactNative;


class ListItem extends Component {

  // constructor(props) {
  //   super(props);
  // }

  _getUserStatusLine()
  {
    return (this.props.user.userStatusLine == null || this.props.user.userStatusLine == '') ?
      null :
      (<Text style={{color: "gray"}}>{this.props.user.userStatusLine}</Text>);
  }

  _buttonTextClass(buttonValue){
    return (buttonValue == this.props.user.attending) ? styles.selectedButtonText : styles.buttonText;
  }

  _getStatusIconUri(userAttendingValue){
    switch (userAttendingValue) {
      case "Attending":
        return require("../../resources/football.png");
        break;
      case "Attending + Carpool":
          return require("../../resources/car.png");
          break;
      case "Not Attending":
        return require("../../resources/house.png");
        break;
      default:
        return null;
    }

  }
  _disabledStyle(isDisabled){
    return isDisabled ? styles.liDisabled : styles.liEnabled;
  }

  _borderStyle(isNoBorder){
    return isNoBorder ? styles.liNoBorder : styles.liBorder;
  }

  render() {
    return (
      <TouchableOpacity onPress={()=> this.props.onEditPressed(this.props.user)} disabled={this.props.disabled} >

        <View style={[styles.li, this._disabledStyle(this.props.disabled), this._borderStyle(this.props.noBorder)]}>

            <View style={styles.leftView}>
                  <Image
                      style={{width: 50, height: 50, borderRadius: 25}}
                      source={{uri: this.props.user.imageUrl}}
                  />
            </View>

            <View style={styles.centerView}>
              <Text style={styles.liText}>{this.props.user.firstName} {this.props.user.lastName}</Text>
              {this._getUserStatusLine()}
            </View>

            <View style={styles.rightView}>
                <Image
                    style={{width: 35, height: 35, borderRadius: 0}}
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
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  liDisabled:{
    backgroundColor: '#fff',
    borderBottomColor: '#DDDDDD',
  },
  liEnabled:{
    backgroundColor: '#cccccc',
    borderBottomColor: '#adbcab',
  },
  liBorder:{
    borderWidth: 1,
  },
  liNoBorder:{
    borderWidth: 0,
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
    alignItems: 'center',
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },

});
module.exports = ListItem;
