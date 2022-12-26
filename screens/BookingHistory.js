// Screen to view all the history of booking

import React, {Component, useState, useEffect} from 'react';
import {FlatList, Text, View, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import PosterDisplay from '../components/PosterDisplay';

let config = require('../Config');

export default class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      isFetching: false,
    };
    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = config.settings.serverPath + '/api/booking';
    this.setState({isFetching: true});
    fetch(url)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })
      .then(booking => {
        console.log(booking);
        this.setState({booking: booking});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const listItemView = item => {
      return (
        <View
          style={{
            backgroundColor: 'black',
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 30,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            {item.name}
          </Text>
          <PosterDisplay
            onPress={() =>
              this.props.navigation.navigate('ShowTicket', {
                booking: item,
              })
            }
            movieData={item}>
            {item.name}
          </PosterDisplay>
          <View style={{marginTop: 10}}>
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Date: {item.date}
            </Text>
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Time: {item.time}
            </Text>
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                textAlign: 'center',
                fontSize: 20,
              }}>
              Amount: {item.amount + ' Pax'}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        style={{flex: 1, backgroundColor: 'black'}}
        refreshing={this.state.isFetching}
        onRefresh={this._load}
        data={this.state.booking}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
      />
    );
  }
}
