import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/AntDesign';

import HomeScreen from './Front/HomeScreen.js';
import Logout from './Front/Logout.js';
import Categories from './Categories/Categories.js';
import Contacts from './Categories/Contacts.js';
import CategoryScreen from './Categories/CategoryScreen.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

  export default function Home() {
            return (
              <NavigationContainer independent={true}>

              <Drawer.Navigator lazy={true}>
                  <Drawer.Screen name='Home' component={HomeScreen} options={{drawerIcon: config => <Icon size={23} name='home'></Icon>}} />
                  <Drawer.Screen name='Categories' component={CategoryScreen} options={{drawerIcon: config => <Icon size={23} name='menu-fold'></Icon>}} />
                  <Drawer.Screen name='Logout' component={Logout} options={{drawerIcon: config => <Icon size={23} name='logout'></Icon>}}/>
              </Drawer.Navigator>


              </NavigationContainer>
    );
  }
