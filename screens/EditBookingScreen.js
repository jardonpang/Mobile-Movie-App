// Screen to booking the ticket

import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Button,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import {Component} from 'react/cjs/react.production.min';
import moment from 'moment';

let config = require('../Config');

export default class BookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.route.params.booking,
      ticketAmount: 1,
      movieTitle: this.props.route.params.booking.name,
      moviePoster: this.props.route.params.booking.poster,
      date: '',
      time: '',
    };

    this.setTime = this.setTime.bind(this);
    this.setDate = this.setDate.bind(this);
    this._edit = this._edit.bind(this);
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecrementItem = this.DecrementItem.bind(this);
  }

  _edit() {
    if (
      moment(this.state.date, 'DD-MM-YYYY', true).isValid() &&
      moment(this.state.time, 'HH:mm', true).isValid()
    ) {
      let url =
        config.settings.serverPath +
        '/api/booking/' +
        this.state.booking.booking_id;

      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: this.state.date,
          time: this.state.time,
          amount: this.state.ticketAmount,
          booking_id: this.state.booking.booking_id,
        }),
      })
        .then(response => {
          console.log(response);
          if (!response.ok) {
            Alert.alert('Error:', response.status.toString());
            throw Error('Error ' + response.status);
          }

          return response.json();
        })
        .then(respondJson => {
          if (respondJson.affected > 0) {
            Alert.alert('Record UPDATED for movie', this.state.booking.name);
            this.props.navigation.goBack();
          } else {
            Alert.alert('Error in UPDATING');
          }
          this.props.navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (!moment(this.state.date, 'DD-MM-YYYY', true).isValid()) {
      Alert.alert('Invalid Date Format: DD-MM-YYYY');
    }
    if (!moment(this.state.time, 'HH:mm', true).isValid()) {
      Alert.alert('Invalid Time Format: HH:mm');
    }
  }

  setTime(time) {
    if (moment(time, 'HH:mm', true).isValid()) {
      this.setState({time: time});
      console.log('Valid Time');
      console.log(this.state.time);
    }
  }

  IncrementItem = () => {
    this.setState({ticketAmount: this.state.ticketAmount + 1});
  };

  DecrementItem = () => {
    if (this.state.ticketAmount > 1) {
      this.setState({ticketAmount: this.state.ticketAmount - 1});
    } else {
      this.setState({ticketAmount: 1});
    }
  };

  setDate(date) {
    if (moment(date, 'DD-MM-YYYY', true).isValid()) {
      this.setState({date: date});
      console.log('Valid Date');
      console.log(this.state.date);
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 25,
                  }}>
                  Please enter the new date and time
                </Text>
                <View style={{alignItems: 'center', marginTop: 40}}>
                  <Image
                    source={{uri: this.state.moviePoster}}
                    style={{
                      height: 300,
                      width: 200,
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 35,
                    marginRight: 35,
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={{padding: 10, color: 'white', fontSize: 30}}>
                    {this.state.movieTitle}
                  </Text>
                </View>
                <Mytextinput
                  placeholder={'Current Date: ' + this.state.booking.date}
                  onChangeText={date => this.setDate(date)}
                  maxLength={10}
                  keyboardType="numeric"
                  style={{padding: 10, color: 'white'}}
                />
                <Mytextinput
                  placeholder={'Current Time: ' + this.state.booking.time}
                  onChangeText={time => this.setTime(time)}
                  maxLength={10}
                  keyboardType="numeric"
                  style={{padding: 10, color: 'white'}}
                />

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      {'Total Amount: ' +
                        this.state.ticketAmount +
                        'x Person = RM' +
                        this.state.ticketAmount * 12}
                    </Text>
                  </View>
                  <View style={{margin: 5, marginTop: 5, marginLeft: 10}}>
                    <Button
                      color="red"
                      title="+"
                      onPress={this.IncrementItem}
                    />
                  </View>
                  <View style={{margin: 5, marginTop: 5, marginLeft: 1}}>
                    <Button
                      color="red"
                      title="-"
                      onPress={this.DecrementItem}
                    />
                  </View>
                </View>
                <Button title="Edit Booking" onPress={() => this._edit()} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
