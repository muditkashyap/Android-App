import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import Categories from './Categories.js';
import Contacts from './Contacts.js';

class CategoryScreen extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Categories'>
          <Stack.Screen name='Categories' component={Categories} />
          <Stack.Screen name='Contacts' component={Contacts} />
        </Stack.Navigator>
      </NavigationContainer>
    );

 }
}
export default CategoryScreen;
