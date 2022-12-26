import React from 'react';
import {ScrollView, Alert, Button, View, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Component} from 'react/cjs/react.production.min';

let config = require('../Config');

export default class ShowTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.route.params.booking,
    };

    this._delete = this._delete.bind(this);
  }

  componentDidMount() {}

  _delete() {
    Alert.alert('Confirm to DELETE booking for', this.state.booking.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url =
            config.settings.serverPath +
            '/api/booking/' +
            this.state.booking.booking_id;
          console.log(url);
          fetch(url, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({booking_id: this.state.booking.booking_id}),
          })
            .then(response => {
              if (!response.ok) {
                Alert.alert('Error:', response.status.toString());
                throw Error('Error ' + response.status);
              }
              return response.json();
            })
            .then(responseJson => {
              if (responseJson.affected == 0) {
                Alert.alert('Error in DELETING');
              }
            })
            .catch(error => {
              console.error(error);
            });
          Alert.alert('Delete SUCCESS');
          this.props.navigation.goBack();
        },
      },
    ]);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.wrapper]}>
          <View style={styles.heading}>
            <Text style={styles.headingtxt} numberOfLines={1}>
              {this.state.booking.name}
            </Text>
          </View>

          <View style={styles.date}>
            <Text style={styles.datetxt}>Details:</Text>
            <Text style={styles.datetxt}>{this.state.booking.date}</Text>
            <Text style={styles.datetxt}>{this.state.booking.time}</Text>
          </View>
          <Text style={styles.seattxt}>
            {'No of Seats:' + this.state.booking.amount}{' '}
          </Text>
          <View style={styles.order}>
            <Text style={styles.datetxt}>Ticket number:</Text>
            <Text style={styles.ordertxt}>
              {12244667 + this.state.booking.booking_id}
            </Text>
          </View>
          <View style={styles.qrCode}>
            <QRCode
              value={
                'https://en.wikipedia.org/wiki/QR_code#/media/File:QR_code_for_mobile_English_Wikipedia.svg'
              }
              size={180}
              backgroundColor="white"
              foregroundColor="white"
            />
          </View>
          <View style={{marginTop: 30}}>
            <Button
              color="red"
              title="Edit"
              onPress={() =>
                this.props.navigation.navigate('EditBooking', {
                  booking: this.state.booking,
                })
              }
            />
            <Button color="red" title="Delete" onPress={() => this._delete()} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  wrapper: {
    height: 660,
    width: 280,
    backgroundColor: '#ffdead',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 100,
  },
  heading: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  date: {
    marginTop: 20,
  },
  order: {marginTop: 25},
  headingtxt: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  seattxt: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  datetxt: {
    color: '#000000',
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  ordertxt: {
    textAlign: 'center',

    letterSpacing: 5,
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 25,
  },
  qrCode: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
