'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';

import renderIf from './../../helpers/renderif.js'

const { Platform, StyleSheet, Text, TextInput, View, Image, TouchableOpacity} = ReactNative;



class EditUserView extends Component {
  constructor(props) {
    super(props);
    this.state = { WhatsInYourMindText: this.props.user.userStatusLine };

  }

  getWhatsInYourMindTitle(){
    return "What's on your mind?";
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{this.props.user.firstName} {this.props.user.lastName}</Text>
        </View>

        <View style ={styles.bodyView}>
          <View style={styles.WhatsInYourMindView}>
            <Text style={styles.WhatsInYourMindTitle} >{this.getWhatsInYourMindTitle()}</Text>

            <TextInput
              style={styles.WhatsInYourMindInput}
              maxLength = {50}
              onChangeText={(text) => this.setState({WhatsInYourMindText:text})}
              value={this.state.WhatsInYourMindText}
            />
          </View>

          <View style={styles.allButtonsView}>
            <TouchableOpacity
            onPress={() => this.props.onEditCompleted(this.props.user, "Attending", this.state.WhatsInYourMindText)}>
              <View style={styles.button}>
                <Text style={styles.buttonText} >Attending</Text>
                  <Image
                      style={styles.buttonImage}
                      source={require("../../resources/football.png")}
                  />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => this.props.onEditCompleted(this.props.user, "Attending + Carpool", this.state.WhatsInYourMindText)}>
              <View style={styles.button}>
                <Text style={styles.buttonText} >Attending + Carpool</Text>
                <Image
                    style={styles.buttonImage}
                    source={require("../../resources/car.png")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => this.props.onEditCompleted(this.props.user, "Not Attending", this.state.WhatsInYourMindText)}>
              <View style={styles.button}>
                <Text style={styles.buttonText} >Not Attending</Text>
                <Image
                    style={styles.buttonImage}
                    source={require("../../resources/house.png")}
                />
              </View>
            </TouchableOpacity>

            {renderIf(this.props.isAdminUser)(
            <TouchableOpacity
            onPress={() => this.props.onEditCompleted(this.props.user, "Clear", this.state.WhatsInYourMindText)}>
              <View style={styles.button}>
                <Text style={styles.buttonText} >Clear</Text>

              </View>
            </TouchableOpacity>
            )}

          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    backgroundColor: '#ffffff',
    flex:1
  },
  bodyView:{
    paddingRight:10,
    paddingLeft:10,
  },
  titleView:{
    alignItems: 'center',
    backgroundColor: '#16924D',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 0,
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
    marginBottom:5
  },
  titleText:{
    color: '#ffffff',
    fontSize: 18,
    fontWeight: "500",
    textAlign: 'center'
  },
  WhatsInYourMindView:{
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  WhatsInYourMindTitle:{
    fontSize: 18,
    fontWeight: "300",
    color: '#666666'
  },
  WhatsInYourMindInput:{
    height: 35,
    marginTop:10,
    marginBottom:10,
    borderColor: 'grey',
    borderWidth: 0,
    fontSize: 16,
    paddingVertical: 0,
    backgroundColor : '#ffffff',

    ...Platform.select({
      ios: {
        borderWidth: 1,
      },
      android: {
        borderWidth: 0,
      },
    }),

  },
  allButtonsView:{

  },
  button:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 4,
    paddingRight:15,
    paddingLeft:15,
    borderRadius: 10,
    backgroundColor : '#dddddd',
    height:50,

  },
  buttonText: {
    color: '#333',
    fontSize: 20,
  },
  buttonImage:{
    width: 40,
    height: 40,
    marginTop:5,
    marginBottom:5
  }

});

module.exports = EditUserView;
