import React, {Component, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import { Container, Header, Title,
         Content, Footer, Accordion,
         FooterTab, Button,
         Left, Right, Body,
         Text, Card, CardItem,
         Form, Input, Item,
         Label, Icon, DatePicker,
         Picker, Toast
        } from 'native-base';
import IconAnt from 'react-native-vector-icons/AntDesign';
import 'react-native-gesture-handler';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import qs from 'qs';

import Home from './Home.js';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      mob: '',
      password: '',
      secureText: true,
      icon: 'eye-off'
    };
  }

  saveData = async(userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('loggedIn', JSON.stringify(true));
      Toast.show({text: 'Welcome', position: 'bottom', type: 'success', buttonText: 'Okay'});
      this.props.navigation.navigate('Home');
    } catch(e){ console.log(e.message); }
   }



  createUser = () => {

    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.state.name == '' || this.state.email == '' || this.state.mob == '' || this.state.password == '') {
      Toast.show({text: 'Cannot leave empty fields', position: 'bottom', type: 'warning', buttonText: 'Okay'});
    } else if(!(re.test(this.state.email))) {
      Toast.show({text: 'Invalid Email', position: 'bottom', type: 'danger', buttonText: 'Okay'});
    } else if(!(this.state.mob.length==10)){
      Toast.show({text: 'Invalid Mobile No.', position: 'bottom', type: 'danger', buttonText: 'Okay'});
    } else {
    axios.
          post('http://android.dainikresult.com/signin/Api.php?apicall=signup', qs.stringify(this.state), {headers: {'Content-Type': 'application/x-www-form-urlencoded' }})
          .then( (response) => {
            console.log(response);
              if(!response.data.error){
                  this.saveData(response.data.user);
                } else {
                  alert("User Already Registered, Try Again!");
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
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View style={{borderColor: 'gray', borderWidth: 2, borderRadius: 10, padding: 25}}>

        <Form style={{width: 275}}>


          <Item regular floatingLabel style={{marginBottom: 20, borderRadius: 5}}>
            <Label style={{marginTop: -17, fontSize: 16}}> Full Name</Label>
            <Input  onChangeText={(name) => this.setState({name: name})}/>
          </Item>

          <Item regular floatingLabel style={{marginBottom: 20, borderRadius: 5}}>
            <Label style={{marginTop: -17, fontSize: 16}}> Email Address</Label>
            <Input  onChangeText={(email) => this.setState({email: email})}/>
          </Item>

          <Item regular floatingLabel style={{marginBottom: 20, borderRadius: 5}}>
            <Label style={{marginTop: -17, fontSize: 16}}> Mobile No.</Label>
            <Input keyboardType='numeric' onChangeText={(Mob) => this.setState({mob: Mob})} />
          </Item>

          <Item regular floatingLabel style={{marginBottom: 20, borderRadius: 5}}>
            <Label style={{marginTop: -17, fontSize: 16}}> Password</Label>
            <Input onChangeText={(pass) => this.setState({password: pass})} secureTextEntry={this.state.secureText} />
            <Icon name={this.state.icon}  style={{marginBottom: 15}} onPress={this.toggle.bind(this)}/>
          </Item>

                <Button onPress={this.createUser.bind(this)} iconLeft full rounded>
                    <IconAnt name='adduser' color={'white'} size={20}/>
                    <Text>Signup</Text>
                </Button>

        </Form>

        </View>
      </View>

    );
  }
}
 export default Signup;
