import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

export default class PosterDisplay extends Component {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={{
          height: 200,
          width: 150,
          marginHorizontal: 10,
        }}>
        <View>
          <Image
            source={{uri: this.props.movieData.poster}}
            style={{
              height: 200,
              width: 150,
              borderRadius: 20,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
