import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import SplashScreen from './components/SplashScreen/SplashScreen.js';
import store from './store/index.js';
import Login from './components/Login/Login.js';
import VerifyOTP from './components/Login/VerifyOTP.js';

class App extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
      <Provider store={store}>
      <Root>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='verifyOTP' component={VerifyOTP} />
        </Stack.Navigator>
      </NavigationContainer>
      </Root>
      </Provider>
    );

 }
}
export default App;
