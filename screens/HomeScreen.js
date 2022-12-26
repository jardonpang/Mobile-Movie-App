import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PosterDisplay from '../components/PosterDisplay';

let config = require('../Config');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      comingSoon: [],
      isFetching: false,
      isFetching2: false,
    };

    this._load = this._load.bind(this);
    this._load2 = this._load2.bind(this);
  }

  componentDidMount() {
    this._load();
    this._load2();
  }

  _load() {
    let url = config.settings.serverPath + '/api/movies';
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
      .then(movies => {
        console.log(movies);
        this.setState({movies: movies});
      })
      .catch(error => {
        console.log(error);
      });
  }

  _load2() {
    let url = config.settings.serverPath + '/api/comingsoon';
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
      .then(comingsoon => {
        console.log(comingsoon);
        this.setState({comingSoon: comingsoon});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'black'}}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <Text style={styles.Text}>Now Showing</Text>
        </View>

        <FlatList //Now Showing Section
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.state.movies}
          renderItem={({item}) => {
            return (
              <PosterDisplay
                onPress={() =>
                  this.props.navigation.navigate('BookingScreenStack', {
                    movie: item,
                  })
                }
                movieData={item}>
                {item.name}
              </PosterDisplay>
            );
          }}></FlatList>

        <View style={{flexDirection: 'row', padding: 15, paddingTop: 30}}>
          <Text style={styles.Text}>Coming Soon</Text>
        </View>
        <FlatList //Coming Soon Section
          refreshing={this.state.isFetching2}
          onRefresh={this._load2}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.state.comingSoon}
          renderItem={({item}) => {
            return (
              <PosterDisplay
                onPress={() =>
                  this.props.navigation.navigate('InfoScreenStack', {
                    comingsoon: item,
                  })
                }
                movieData={item}>
                {item.name}
              </PosterDisplay>
            );
          }}></FlatList>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontFamily: 'notoserif',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
