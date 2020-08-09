import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';

import App from '../../App.js';
class Logout extends React.Component{
  constructor(props) {
    super(props);
      this.logout();
      this.state = {
        loaded: false
      }
  }

      logout = async() => {
        try {
           await AsyncStorage.clear();
          this.setState({loaded: true});
        } catch(e){
          alert(e.message);
        }
      }

  render(){
    if(!this.state.loaded){
      return(<Text>Loading</Text>);
    } else {
      return(<App />);
    }
  }
}



export default Logout;
