'use strict';

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
  LoginManager
} = FBSDK;


export default class FBManager {
  constructor()
  {

  }

  logout(){
    LoginManager.logOut();
  }

  getUserId():Promise<?String>{
    return new Promise(function(resolve, reject) {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          if (data != null){
            var userId = data.getUserId();
            resolve(userId);
          }
          else{
            reject(null);
          }
        });
      });
  }

}

module.export = FBManager
