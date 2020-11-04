import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, Alert, BackHandler, ActivityIndicator
} from 'react-native';

import axios from 'axios';
import {List, Item, Input, Button, Label, Icon, Toast} from 'native-base';
import Awesome from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import OtpInputs from 'react-native-otp-inputs';


const {height, width} = Dimensions.get('window');
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
const vector4 = '<svg viewBox="0 0 360 267" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31859 266.999C52.3328 75.1111 294.468 249.083 358.921 44.1234L359.318 266.584L1.31859 266.999Z" fill="#EB5757" fill-opacity="0.66"/><path d="M2.08044 266.792C53.437 36.7365 295.262 245.713 360.08 0L360.08 266.792L2.08044 266.792Z" fill="#EB5757" fill-opacity="0.8"/><path d="M0.318595 267C51.5439 112.991 294.293 252.554 359 88.0513L359.318 266.584L0.318595 267Z" fill="#EB5757" fill-opacity="0.9"/></svg>';
//request.time < timestamp.date(2020, 20, 12);

class verifyOTP extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      icon: 'eye-off',
      email: 'Qq@qq.qq',
      password: 'Abc123',
      loginPressed: false,
      buttonOpacity: 1,
    }
  }

  logout = () => {
    console.log("In Here")
    auth()
    .signOut()
    .then(() => {
      console.log("LoggingOut")
      this.props.navigation.navigate('SplashScreen')})
    .catch(error => console.log(error))
  }


  // saveData = (res) => {
  //   var temp = auth().currentUser;
  //   console.log(res);
  //   firestore().collection('users').doc(res.user.uid).get().
  //     then(data => {
  //       console.log("First TIme re");
  //       this.setState({currentUserData: data._data});
  //       this.props.login(data._data);
  //       console.log(this.props.currentUserData)
  //       if(!this.state.currentUserData.isVerified)
  //            this.props.navigation.navigate('PhoneAuth');
  //       const refernce = storage().ref('/profile_' + temp.uid + '.png');
  //       refernce.getDownloadURL().
  //             then(res => {
  //               console.log(res);
  //               this.setState({profile_url: res})
  //       this.props.saveDP(res)
  //     }).
  //             catch(error => {
  //               console.log(error);
  //               const ref = storage().ref('man.png');
  //               ref.getDownloadURL().
  //                 then(res => this.props.saveDP(res)
  //                 ).
  //                 catch(err => console.log("Errpr 1", err))
  //             });
  //     }).
  //     catch(error => {
  //       console.log("First TIme errorre", this.props.currentUserData);
  //       Alert.alert(
  //         'Logging Out',
  //         'Something Wrong, Login Again!', [ {
  //             text: 'OK',
  //             onPress: () => this.logout()
  //         }, ], {
  //             cancelable: false
  //         }
  //      )
    
  //     });
  // }

  saveData = async (res) => {
     await firestore().collection('users').doc(res.user.uid).get().
      then((result) => {
          this.props.login(result._data);
          const refernce = storage().ref('/profile_' + res.user.uid + '.png');
        refernce.getDownloadURL().
              then(res => {
                console.log(res);
                this.setState({profile_url: res})
        this.props.saveDP(res)
      }).
              catch(error => {
                console.log(error);
                const ref = storage().ref('man.png');
                ref.getDownloadURL().
                  then(res => this.props.saveDP(res)
                  ).
                  catch(err => console.log("Errpr 1", err))
              });
      }).
      catch((error) => console.log(error));
  }

  loginUser = () => {
    this.setState({loginPressed: true, buttonOpacity: 0.5});
    if(this.state.email == '' || this.state.password == ''){
          if(this.state.email == '') Toast.show({
               text: "Please Input Email",
               buttonText: "Okay",
               duration: 3000,
               type: "warning",
             })
            else       Toast.show({
                           text: "Please Input Passowrd",
                           buttonText: "Okay",
                           duration: 3000,
                           type: "warning",
                         })
                         this.setState({loginPressed: false, buttonOpacity: 1});

    } else {
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.saveData(res);
      })
      .catch(error => {
        console.log(error);
        Toast.show({
                 text: "Wrong Password",
                 buttonText: "Okay",
                 duration: 3000,
                 type: "error",
               })
               this.setState({loginPressed: false, buttonOpacity: 1});

      })

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
    return(<View style={{backgroundColor: '#B34D8C', flex: 1}}>
         <View style={styles.PageText}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(8), color: 'white',}}>Verify</Text>
      </View>
      <View style={{backgroundColor: 'white', flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingVertical: 2*height/100}}>
          <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: RFPercentage(3.5), alignSelf: 'center'}}>Enter Your OTP Code</Text>
          <View>
          
          </View>
                <View style={{paddingTop: 5*height/100, flex: 1, justifyContent: 'space-around',}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_LIGHT, fontSize: RFPercentage(8)}}>X</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <Button androidRippleColor full style={{height: 8*height/100, borderRadius: 20, width: 60*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, marginBottom: 2*height/100, backgroundColor: '#B34D8C', justifyContent: 'center'}}  >
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Verify</Text>
              </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PageText: {
    paddingTop: 5*height/100,
    paddingLeft: 5*height/100,
    height: 20*height/100
  },
  LoginForm: {
    height: 75*height/100,
    paddingHorizontal: 8*width/100,
    paddingTop: 20*height/100,
  },

  InputBox: {
      borderWidth: 3,
      borderRadius: 10,
  },

  copyright: {
    marginTop: 1*height/100,
    height: 7*height/100,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  SignupText: {},
  SignupSubText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2*height/100,
  },
});


const mapDispatchToProps = dispatch => {
  return {
    login: (loginData) => dispatch({type: 'LOGIN', data: loginData}),
    saveDP: (profilleURL) => dispatch({type: 'SAVE_DP', data: profilleURL})
  }
}

export default connect(null, mapDispatchToProps)(verifyOTP);
