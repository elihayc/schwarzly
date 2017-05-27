// API documentation : https://www.firebase.com/docs/web/api/firebase/set.html
// Sample project: https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html
'use strict';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "https://teamly-ce078.firebaseio.com/",
  storageBucket: ""
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class FireBaseManager {
  constructor()
  {
    this.usersRef = this.getRef().child('users2');
    this.eventsRef = this.getRef().child('events');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  createUser(id, firstName, lastName, image_url){
    this.usersRef.child(id).update({id: id, firstName: firstName, lastName: lastName,imageUrl: image_url});
  }

  setUserInEvent(eventId,user){
    this.eventsRef.child(eventId + '/users/' + user['id']).set(user);
  }

  deleteUserFromEvent(eventId, user){
    this.eventsRef.child(eventId + '/users/' + user['id']).remove();
  }

  addEvent(eventId, eventDate){
    this.eventsRef.child(eventId).update({date: eventDate, id:eventId});
  }

  deleteEvent(eventId){
    this.eventsRef.child(eventId).remove();
  }

}

module.export = FireBaseManager
