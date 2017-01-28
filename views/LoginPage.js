
'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native'

import FireBaseManager from './../BL/FireBaseManager.js'

const sharedStyles = require('./styles/styles.js')
const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: false};
  }

  onLoginFinished(error,result){
    if (error) {
      this.setState({isLoading: false});
      console.log("login has error: " + result.error);
    } else if (result.isCancelled) {
      this.setState({isLoading: false});
      console.log("login is cancelled.");
    }
    else {
      this.setState({isLoading: true});

      AccessToken.getCurrentAccessToken().then(
        (data) => {
            // alert(data.accessToken.toString());
            console.log(data);

            let accessToken = data.accessToken

            const responseInfoCallback = (error, result) => {
                if (error) {
                  //TODO: handle facebook login error
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  console.log('Success fetching data: ');
                  console.log(result);
                  new FireBaseManager().createUser(result.id, result.first_name, result.last_name, result.picture.data.url);
                  this.props.onLogedIn(true);
                }
              }

            const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name,picture'
                    }
                  }
                },
                responseInfoCallback
              );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start()
        })
    }
  }
  _renderLoginButton(){
    if (this.state.isLoading == false)
    {
      return(
        <LoginButton
          onLoginFinished={(error, result) => {this.onLoginFinished(error,result)}}
          onLogoutFinished={() => console.log("logout.")}
        />
      );
    }
    else {
      return (<ActivityIndicator size='large' color='black'/>);
    }
  }
  render() {
    return (
      <Image source={require('../resources/group.jpg')} style={styles.container}>
        <View style={sharedStyles.center}>
          <Image style={styles.logoImg} source={require('../resources/logo.png')} />
          {this._renderLoginButton()}
        </View>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    marginBottom: 10,
    marginTop: -10
  }
});

module.exports = LoginPage;
