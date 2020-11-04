import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  BackHandler
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

class PhoneAuth extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      phone: '',
      confirmResult: null,
      verificationCode: '',
      userId: '',
      OTPVisible: false,
    }

    // this.handleSendCode();
  }

  handleSendCode = () => {
  // Request to send OTP
  console.log(this.state.phone)
  if (this.validatePhoneNumber()) {
    this.setState({OTPVisible: true})
      auth()
      .signInWithPhoneNumber(this.state.phone)
      .then(confirmResult => {
        console.log(confirmResult)
        this.setState({ confirmResult });
        firestore().collection('users').doc(auth().currentUser.uid).update({
          isVerified: true,
          phone_no: this.state.phone
        })
      }).then(res => {
        console.log("Updated", res);
        auth()
        .signOut()
        .then(() => {
          console.log("LoggingOut");
          alert('Your Phone Number Is Verified, Please Login Again!');
          this.props.navigation.navigate('SplashScreen')
        })
        .catch(error => console.log(error))
      }).catch(error => {
        alert(error.message)

        console.log(error)
      })
  } else {
    alert('Invalid Phone Number')
  }
}

checkOTP = () => {
  this.state.confirmResult.confirm(this.state.verificationCode).then(res=> {
    console.log(res);
    firestore().collection('users').doc(auth().currentUser.uid).update({
      isVerified: true,
      phone_no: this.state.phone
    }).then(res => {
      console.log(res);
      auth()
      .signOut()
      .then(() => {
        console.log("LoggingOut");
        alert('Your Phone Number Is Verified, Please Login Again!');
        this.props.navigation.navigate('SplashScreen')
      })
      .catch(error => console.log(error))
    })
}).catch(err => console.log(err))
}

  validatePhoneNumber = () => {
  var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
  return regexp.test(this.state.phone)
}

  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image source={require('../../assets/images/background.png')} style={{height: height, width: width, position: 'absolute'}} />
      
      <View style={{marginTop: height/4}}>
      <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 25, marginBottom: 2*height/100}}>Verify Mobile Number</Text>
      <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, marginBottom: 5*height/100, color: '#505050'}}>Your Mobile Number is not yet verified</Text>
      <View style={{paddingHorizontal: 10*width/100}}>
        <View style={{flexDirection: 'row'}}>
      <Item inlineLabel style={{borderRadius: 10, marginBottom: 3*height/100, width: 60*width/100}}>
        <Label>+91</Label>
        <Input keyboardType='number-pad' placeholder='Phone No.' style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR}} selectionColor='#EB5757' onChangeText={(phone) => this.setState({phone: '+91'+phone})} />
      </Item>
      <Button androidRippleColor full style={{height: 6*height/100, borderRadius: 10, width: 20*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.handleSendCode()} >
        <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Send</Text>
      </Button>
      </View>

      {this.state.OTPVisible ? <Item rounded inlineLabel style={{borderRadius: 10, marginBottom: 3*height/100, width: 60*width/100, alignSelf: 'center'}}>
        <Label style={{marginLeft: 2*width/100}}>OTP</Label>
        <Input keyboardType='number-pad' placeholder='6 Digit OTP' style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR}} selectionColor='#EB5757' onChangeText={(verificationCode) => this.setState({verificationCode: verificationCode})} />
      </Item> : <View></View> }



      <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.checkOTP()} >
        <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Verify</Text>
      </Button>
      </View>
      </View>
      </View>
    )
  }

}

export default PhoneAuth;
