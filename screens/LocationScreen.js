import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  // PermissionsAndroid,
  TouchableNativeFeedback,
  Alert,
  ScrollView,
} from 'react-native';

import openMap from 'react-native-open-maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default class LocationScreen extends Component {
  _onPress() {
    Alert.alert('You tapped the button!');
    console.log('button is pressed');
    openMap({
      // latitude:3.0495,
      // longitude:101.7663,
      query:
        'F01, 1st Floor, AEON Cheras Selatan Shopping Centre, Lebuh Tun Hussein Oon Balakong, 43200 Cheras, Selangor',
      zoom: 16,
      provider: 'google',
    });
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'black'}}>
        <View>
          <View>
            <Text style={styles.label}>Address :</Text>
            <Text style={styles.address}>
              F01, 1st Floor, AEON Cheras Selatan Shopping Centre, Lebuh Tun
              Hussein Oon Balakong, 43200 Cheras, Selangor
            </Text>
          </View>

          <TouchableNativeFeedback
            onPress={this._onPress.bind(this)}
            color="#841584">
            <View style={styles.button}>
              <Text style={styles.buttonText}>I AM HERE!</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 3.0495,
              longitude: 101.7663,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              title="TGV Cheras Selatan"
              description="Cinema in Aeon Mall"
              coordinate={{
                latitude: 3.0495,
                longitude: 101.7663,
              }}
            />
          </MapView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  address: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
    color: 'white',
  },
  label: {
    fontSize: 20,
    padding: 20,
    color: 'white',
  },
  button: {
    // decorate button
    marginBottom: 30,
    width: 230,
    alignItems: 'center',
    borderRadius: 200,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    // style the map size and position within app
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
