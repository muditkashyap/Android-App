import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, Alert
} from 'react-native';

import axios from 'axios';
import {List, Item, Input, Button, Label, Icon, Toast} from 'native-base';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Svg, {SvgXml, Path, Line} from 'react-native-svg';
import IconAnt from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('screen');

class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      phone: '',
      confirmResult: null,
      verificationCode: '',
      userId: '',
      OTPVisible: false,
      email: '',
    }
  }

  passwordReset = (email) => {
    auth().sendPasswordResetEmail(this.state.email).then(res => {
        console.log(res);
        Alert.alert(
            'Successfull',
            'Password Reset Link has been sent to your Email Address', [{
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Login')
            }, ], {
                cancelable: false
            }
         )
    }).
    catch(err => {
        console.log(err)
        Alert.alert(
            'Wrong Email',
            'No user found with this Email Address', [{
                text: 'OK',
                onPress: () => console.log("OK")
            }, ], {
                cancelable: false
            }
         )
    });
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image source={require('../../assets/images/background.png')} style={{height: height, width: width, position: 'absolute'}} />
      
      <View style={{marginTop: height/4, paddingHorizontal: 10*width/100}}>
      <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 25, marginBottom: 2*height/100}}>Recover Your Password</Text>
      <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, marginBottom: 5*height/100, color: '#505050'}}>Type your registered email address to get password reset link.</Text>
      <View style={{}}>
      <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100, }}>
        <Input keyboardType='email-address' placeholder='Email Address.' style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR}} selectionColor='#EB5757' onChangeText={(email) => this.setState({email: email})} />
      </Item>

      <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.passwordReset()} >
        <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Recover</Text>
      </Button>
      </View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{alignSelf: 'center', flexDirection: 'row'}} >
            <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#EB5757', }}>Login</Text>
          </TouchableOpacity>
      </View>
      </View>
    )
  }

}

export default ForgotPassword;
