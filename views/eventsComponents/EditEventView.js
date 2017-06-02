'use strict';
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

// Using for date format
import moment from 'moment';

import DatePicker from 'react-native-datepicker';

const DATE_FORMAT = "DD-MM-YYYY HH:mm";

class EditEventView extends Component {
  constructor(props){
     super(props)

     var defaultDate = moment(new Date()).format(DATE_FORMAT);

     this.state = {date:defaultDate, eventTitle:""}
  }

  onAddButtonPressed(){
    var eventId = this.state.date.substr(6,4) + '-' +
                      this.state.date.substr(3,2) + '-' +
                      this.state.date.substr(0,2);
    var eventDate = this.state.date + ' ' + this.state.eventTitle;

    this.props.onEditEventCompleted(eventId, eventDate)
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
             style={{height: 40, borderColor: 'gray', borderWidth: 1}}
             onChangeText={(text) => this.setState({eventTitle:text})}
             value={this.state.eventTitle}
           />

      <DatePicker
         style={{width: 200}}
         date={this.state.date}
         mode="datetime"
         placeholder="select date"
         format={DATE_FORMAT}
         is24Hour={true}
         confirmBtnText="Confirm"
         cancelBtnText="Cancel"
         customStyles={{
           dateIcon: {
             position: 'absolute',
             left: 0,
             top: 4,
             marginLeft: 0
           },
           dateInput: {
             marginLeft: 36
           }
         }}
         onDateChange={(date) => {this.setState({date: date})}}
       />

       <TouchableOpacity
       onPress={() => this.onAddButtonPressed()}>
         <View style={styles.button}>
           <Text style={styles.buttonText} >Add</Text>

         </View>
       </TouchableOpacity>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    backgroundColor: '#ffffff',
    flex:1
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
});
module.exports = EditEventView;
