import React, {Component} from 'react';
import {AppRegistry,View,ImageBackground, StyleSheet, Image, Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';

import Signin from './Comps/Signin.js';
import Signup from './Comps/Signup.js';
import Home from './Comps/Home.js';
import Contacts from './Comps/Categories/Contacts.js';

class App extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
      <Root>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Signin'>
          <Stack.Screen name='Signin' component={Signin} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Contacts' component={Contacts} />
        </Stack.Navigator>
      </NavigationContainer>
      </Root>
    );

 }
}
export default App;
