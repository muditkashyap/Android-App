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
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class Community extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View><Text>2</Text></View>
        );
    }
}

export default function Community;