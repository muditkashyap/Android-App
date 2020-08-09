import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Container, Header, Footer, Text, Badge, Content, List, ListItem, Thumbnail, Button, Left, Body, Right} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import qs from 'qs';



class showData extends React.Component {
      constructor(props){
            super(props);
            this.state = {
                  data: this.props.data,
            }
      }

     
      render(){

   }
}

export default showData;

