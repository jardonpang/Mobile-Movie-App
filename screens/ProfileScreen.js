import React, {Component} from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ProfileScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image source={require('../img/qiqi.jpg')} size={80} />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                Qiqi
              </Title>
              <Caption style={styles.caption}>@genshinpaimon</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="locate" color="#FFFFFF" size={20} />
            <Text style={{color: '#FFFFFF', marginLeft: 20}}>
              Kluang, Malaysia
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="phone-portrait" color="#FFFFFF" size={20} />
            <Text style={{color: '#FFFFFF', marginLeft: 20}}>012-3456789</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="mail" color="#FFFFFF" size={20} />
            <Text style={{color: '#FFFFFF', marginLeft: 20}}>
              qiqiImpact@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: '#FFFFFF',
                borderRightWidth: 1,
              },
            ]}>
            <Title style={styles.title}>6549 pts</Title>
            <Caption style={styles.caption}>Member Points</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title style={styles.title}>12</Title>
            <Caption style={styles.caption}>Time Slots</Caption>
          </View>
        </View>

        <View style={styles.menuwrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="heart" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Your Favourites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="card" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Your Card</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="paper-plane" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Share</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="help-circle" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Help</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="cog" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  userInfoSection: {
    marginBottom: 25,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderTopColor: '#FFFFFF',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 90,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuwrapper: {
    marginTop: 10,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#FFFFFF',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
