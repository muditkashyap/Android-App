import React, {Component} from 'react';
import {AppRegistry, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Content, Footer,
        Container, Fab, Button,
        } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';


  class HomeScreen extends React.Component {

    constructor(props){

      super(props);
          this.state = {
            currentTime: new Date(),
            loggedInTime: '',
            totalTime: '',
            timeRemaining: 5,
          }
    }


    render(){
      const Styles = StyleSheet.create({
                header: {
                  justifyContent: 'flex-start',
                  backgroundColor: 'white',
                  paddingTop: 10,
                }
        });

      return(
          <Container>
              <Header style={Styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='bars' size={35} />
              </TouchableOpacity>
              </Header>
              <Content>
              </Content>
          </Container>
      );
    }
  }

  export default HomeScreen;
