import React, {Component, useEffect} from 'react';
import {AppRegistry,View,ImageBackground, StyleSheet, Image, ToastAndroid} from 'react-native';
import { Container, Header, Title,
         Content, Footer, Accordion,
         FooterTab, Button,
         Left, Right, Body,
         Text, Card, CardItem,
         Form, Input, Item,
         Label, Icon, Spinner,
         Toast
        } from 'native-base';
import 'react-native-gesture-handler';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import qs from 'qs';


import Home from './Home.js';
import Signup from './Signup.js';


class Signin extends React.Component {

    constructor(props){
      super(props);
      this.getData();
      this.state = {
        email:'',
        password: '',
        loggedIn: false,
        laoded: false,
        secureText: true,
        icon: 'eye-off',
        show: false,
      };
    }

    getData = async() => {
          try {
              loggedIn = await AsyncStorage.getItem('loggedIn');
              this.setState({loaded: true});
              if(loggedIn) this.props.navigation.navigate('Home');
          } catch(e) {
              console.log(e.message);
          }
    }



    saveData = async(userData) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            await AsyncStorage.setItem('loggedIn', JSON.stringify(true));
            await AsyncStorage.setItem('loggedInTime', JSON.stringify(new Date().getTime()))
            Toast.show({text: 'Login Successfull', position: 'bottom', type: 'success', buttonText: 'Okay'});
            this.props.navigation.navigate('Home');
        } catch(e){
          console.log(e.message);
        }
    }

    checkUser = () => {

          var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
          if(this.state.email == '' || this.state.password == '') {
            Toast.show({text: 'Cannot leave empty fields!', type:'warning', position: 'bottom', buttonText: 'Try Again'});
          } else if(!(re.test(this.state.email))) {
            Toast.show({text: 'Invalid Email', position: 'bottom', type: 'danger', buttonText: 'Okay'});
          } else {
            axios.
                  post('http://android.dainikresult.com/signin/Api.php?apicall=login', qs.stringify(this.state), {headers: {'Content-Type': 'application/x-www-form-urlencoded' }})
                  .then( (response) => {
                    console.log(response.data.user);
                      if(!response.data.error)
                      {
                        this.saveData(response.data.user);
                      }else{
                        Toast.show({text: 'Invalid Email OR Password', position: 'bottom', type: 'danger', buttonText: 'Try Again'});
                  }
                })
                  .catch( (response) => console.log(response))
          }


    }

    toggle = () => {
            if(this.state.secureText){
              this.setState({icon: 'eye', secureText: false})
            } else {
              this.setState({icon: 'eye-off', secureText: true})
            }
    }





  render(){

    if(!this.state.loaded){
      return(<Spinner style={{flexDirection: 'row', alignItems: 'center', marginTop: 300}} color='blue' />);
    } else {
        if(this.state.loggedIn){
            return(<Home />);
        } else {
          return(


                  <View  style={{justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', flex: 1}}>

                    <View  style={{borderColor: 'gray', borderWidth: 2, borderRadius: 10, padding: 25}}>

                          <Form style={{width: 275}}>
                              <Item regular {...this.state.status} floatingLabel style={{marginBottom: 20, borderRadius: 5}}>
                                <Label style={{marginTop: -17, fontSize: 16}}> Email</Label>
                                <Input onChangeText={(user) => this.setState({email: user})}/>
                              </Item>

                              <Item regular floatingLabel style={{borderRadius: 5, marginBottom: 20}}>
                                <Label style={{marginTop: -17, fontSize: 16}}> Password</Label>
                                <Input style={{padding: 10}} secureTextEntry={this.state.secureText} onChangeText={(pass) => this.setState({password: pass})}/>
                                <Icon name={this.state.icon}  style={{marginBottom: 15}} onPress={this.toggle.bind(this)}/>
                              </Item>

                              <Button onPress={this.checkUser.bind(this)} style={{justifyContent: 'center', marginBottom: 20}} iconLeft full success rounded>
                                  <IconAnt name='lock' style={{color: 'white'}} size={19}/>
                                  <Text>Signin</Text>
                              </Button>

                          </Form>

                    <View style={{marginBottom: 20, borderBottomColor: 'grey', borderBottomWidth: 0.5, alignItems: 'center'}}>
                                    <Text style={{color: 'grey', marginBottom: -10, alignItems: 'center', backgroundColor: 'white'}}>  OR </Text>
                    </View>

                            <Button onPress={() => this.props.navigation.navigate('Signup')} iconLeft full rounded>
                              <IconAnt name='adduser' color={'white'} size={20}/>
                              <Text>Signup</Text>
                            </Button>
                        </View>
                    </View>

          );
        }
    }
  }
}


export default Signin;
