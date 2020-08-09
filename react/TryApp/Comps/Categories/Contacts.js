import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Container, Header, Footer, Text, Badge, Content, List, ListItem, Thumbnail, Button, Left, Body, Right} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';



class Contacts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      category_data: props.route.params.category_data
    }
    
  }

  render(){
    return(
      <Text>Hello</Text>
    );
  }
}

export default Contacts;
