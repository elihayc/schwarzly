'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const { Platform, StyleSheet, Text, TextInput, View, Image, TouchableHighlight} = ReactNative;

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
          <TouchableHighlight
          onPress={() => this.props.onEditCompleted(this.props.user, "Attending", this.state.WhatsInYourMindText)}>
            <View style={styles.button}>
              <Text style={styles.buttonText} >Attending</Text>
                <Image
                    style={{width: 50, height: 50, borderRadius: 0}}
                    source={require("../../resources/football.png")}
                />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
          onPress={() => this.props.onEditCompleted(this.props.user, "Attending + Carpool", this.state.WhatsInYourMindText)}>
            <View style={styles.button}>
              <Text style={styles.buttonText} >Attending + Carpool</Text>
              <Image
                  style={{width: 50, height: 50, borderRadius: 0}}
                  source={require("../../resources/car.png")}
              />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
          onPress={() => this.props.onEditCompleted(this.props.user, "Not Attending", this.state.WhatsInYourMindText)}>
            <View style={styles.button}>
              <Text style={styles.buttonText} >Not Attending</Text>
              <Image
                  style={{width: 50, height: 50, borderRadius: 0}}
                  source={require("../../resources/house.png")}
              />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
          onPress={() => this.props.onEditCompleted(this.props.user, "Clear", this.state.WhatsInYourMindText)}>
            <View style={styles.button}>
              <Text style={styles.buttonText} >Clear</Text>

            </View>
          </TouchableHighlight>

        </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    margin:10
  },
  titleView:{
    alignItems: 'center',
    backgroundColor: '#16924D',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
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
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  WhatsInYourMindTitle:{
    fontSize: 18,
    fontWeight: "300",
  },
  WhatsInYourMindInput:{
    
    height: 20,
    width:280,
    marginTop:10,
    marginBottom:10,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 16,
  },
  allButtonsView:{

  },
  button:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    borderWidth: 2,
    marginBottom: 4,
    paddingRight:15,
    paddingLeft:15
  },
  buttonText: {
    color: '#333',
    fontSize: 20,
  },

});

module.exports = EditUserView;
