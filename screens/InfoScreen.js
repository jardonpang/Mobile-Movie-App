// Screen to booking the ticket

import React from 'react';
import {View, ScrollView, SafeAreaView, Text, Image} from 'react-native';
import {Component} from 'react/cjs/react.production.min';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: this.props.route.params.comingsoon.name,
      moviePoster: this.props.route.params.comingsoon.poster,
      description: this.props.route.params.comingsoon.description,
      date: this.props.route.params.comingsoon.date,
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View style={{flex: 1}}>
            <ScrollView keyboardShouldPersistTaps="handled">
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
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {this.state.description}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 23,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                Coming Soon
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {this.state.date}
              </Text>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
