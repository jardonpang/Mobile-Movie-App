import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import LocationScreen from './screens/LocationScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShowTicket from './screens/ShowTicket';
import InfoScreen from './screens/InfoScreen';
import BookingHistory from './screens/BookingHistory';
import EditBookingScreen from './screens/EditBookingScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Image,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const tab = createBottomTabNavigator();

class MyDrawerComponent extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...this.props}
          contentContainerStyle={{backgroundColor: 'black'}}>
          <ImageBackground
            source={require('./img/profile7z.jpg')}
            style={{padding: 20}}>
            <Image
              source={require('./img/qiqi.jpg')}
              style={{
                width: 80,
                height: 80,
                marginBottom: 10,
                borderRadius: 40,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Medium',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Qiqi
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  marginRight: 5,
                }}>
                6549 pts
              </Text>
              <Ionicons name="gift" color="#FFFFFF" size={15} />
            </View>
          </ImageBackground>
          <View style={{backgroundColor: 'black', flex: 1, paddingTop: 10}}>
            <DrawerItemList {...this.props} />
          </View>
        </DrawerContentScrollView>
        <View style={{padding: 10, borderTopWidth: 1, borderTopColor: 'grey'}}>
          <TouchableOpacity style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="settings" size={20} color={'#fff'} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: 'EduQLDBeginner-Bold',
                  color: '#fff',
                }}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={20} color={'#fff'} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: 'EduQLDBeginner-Bold',
                  color: '#fff',
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const BottomTab = () => {
  return (
    <tab.Navigator
      initialRouteName="Home Screen"
      screenOptions={{
        tabBarStyle: {backgroundColor: '#333333'},
        tabBarActiveTintColor: '#F96e61',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}>
      <tab.Screen
        name="Home Screen"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="home" size={20} color={'white'} />;
          },
        }}
      />
      <tab.Screen
        name="Profile Screen"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="person" size={20} color={'white'} />;
          },
        }}
      />
    </tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreenStack"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingScreenStack"
        component={BookingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoScreenStack"
        component={InfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookingHistoryStack"
        component={InfoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const LocationStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationScreenStack"
        component={LocationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const ProfileStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreenStack"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const BookingHistoryStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingHistory"
        component={BookingHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShowTicket"
        component={ShowTicket}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBooking"
        component={EditBookingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const App = () => {
  //Drawer: Home, User Account, Location, Show Ticket -Hong Wei
  // Tab: Home, User Account - Wei Lian
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <MyDrawerComponent {...props} />}
        screenOptions={{
          drawerStyle: {backgroundColor: 'black'},
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: 'red',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'EduQLDBeginner-Regular',
            fontSize: 15,
          },
        }}>
        <Drawer.Screen
          name="HomeScreenDrawer"
          component={BottomTab}
          options={{
            title: 'Movie Booking App', //Set Header Title
            headerStyle: {
              backgroundColor: 'red', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            drawerIcon: ({color}) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ProfileScreenDrawer"
          component={ProfileStack}
          options={{
            title: 'User Profile', //Set Header Title
            headerStyle: {
              backgroundColor: 'red', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerTitleAlign: 'center',
            drawerIcon: ({color}) => (
              <Ionicons name="person" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="LocationScreenDrawer" //Drawer > Location
          component={LocationStack}
          options={{
            title: 'Cinema Location', //Set Header Title
            headerStyle: {
              backgroundColor: 'red', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            drawerIcon: ({color}) => (
              <Ionicons name="navigate" size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="BookingHistoryStack" //Drawer > Show Ticket
          component={BookingHistoryStack}
          options={{
            title: 'Booking History', //Set Header Title
            headerStyle: {
              backgroundColor: 'red', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            drawerIcon: ({color}) => (
              <Ionicons name="film" size={20} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
