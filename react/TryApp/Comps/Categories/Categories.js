import React, {Component} from 'react';
import {Image, TouchableOpacity, StyleSheet, View, AsyncStorage, Alert} from 'react-native';
import axios from 'axios';
import {Container, Header, Footer, Text,
        Content, Card, CardItem, Thumbnail,
        Button, Left, Body, Right,
        Fab, Form, Item, Label,
        Input, Toast, Spinner, List,
        ListItem} from 'native-base';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/AntDesign';
import qs from 'qs';
import DialogInput from 'react-native-dialog-input';
import { TextInput } from 'react-native-gesture-handler';

class Categories extends React.Component {

  constructor(props){
    super(props);
    this.getCategories();
        this.state = {
          category_name: '',
          newCategoryName: '',
          isDialogVisible: false,
          temp: '',
          isloaded: false,
          user_details: {
            user_id: '',
            email: '',
            mob: '',
            reg_date: '',
          },
          category_data: {},
        }
  }

//This Function Stores Category Data To Server
   saveCategory = async() => {
     if(this.state.category_name == ''){
         Toast.show({text: 'Cannot leave empty fields!', type:'warning', position: 'bottom', buttonText: 'Try Again'});
     } else {
       var data = {};
        data = {
          category_name: this.state.category_name,
          user_id: this.state.user_details.user_id
        }
        console.log(data)
       axios.
             post('http://android.dainikresult.com/signin/Api.php?apicall=create_category', qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded' }}).
              then( (response) => {
                if(!response.data.error){
                    Toast.show({text: 'Category Created!', type:'success', position: 'bottom', buttonText: 'OK'});
                    this.setState({isloaded: false})
                    this.getCategories();
                }else{
                    Toast.show({text: 'Category Already Exists!', type:'warning', position: 'bottom', buttonText: 'Try Again'});
              }}).
               catch( (e) =>  console.log(e.message))
     }
   }

//This Function Gets The Categories Data From Server
   getCategories = async() => {
     var x = await AsyncStorage.getItem('userData');
     x = JSON.parse(x);
     this.setState({user_details: x})
     this.setState(prevState => ({
       user_details: {
         ...prevState.user_details,
         user_id: x.id
       }
     }))
     axios
      .post('http://android.dainikresult.com/signin/Api.php?apicall=fetch_category', qs.stringify(this.state.user_details), {headers: {'Content-Type': 'application/x-www-form-urlencoded' }})
      .then( (response) => {
        console.log(response.data)
                 if(!response.data.error) {
                       this.setState({category_data: response.data, isloaded: true});
                 } else {
                   alert("No Posts Found!");
                 }
           }
         )
      .catch( (response) => console.log(response.message))
   }

   //This Functions Show All Saved Categories
   ShowData = () => {
    return(
      <List>
            {this.state.category_data.category_data.map(item => (

                              <ListItem key={item.category_id}>
                              <Left>
                              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Contacts', {category_data: item})}}>
                              <Text>{item.category_name}</Text>
                              </TouchableOpacity>
                              </Left>
                              <Right style={{marginLeft: -100,flexDirection: 'row'}}>
                              <TouchableOpacity onPress={() => {this.setState({isDialogVisible: true, temp: item.category_id})}}><Text style={{color: 'green'}}>Update</Text></TouchableOpacity>
                              <Text>      </Text>
                              <TouchableOpacity onPress={() => this.confirmAlert(item.category_id)}><Text style={{color: 'red'}}>Delete</Text></TouchableOpacity>
                              </Right>
                              </ListItem>
                        ))}
      </List>
    );
   }

   //This Function Updates Category Name
   updateCategory = () => {
      if(this.state.newCategoryName == ''){
        Toast.show({text: 'Cannot leave empty fields!', type:'warning', position: 'bottom', buttonText: 'Try Again'});
      } else {
        console.log('changing');
      var data = {
        category_id: this.state.temp,
        category_name: this.state.newCategoryName,
      }
      axios
      .post('http://android.dainikresult.com/signin/Api.php?apicall=edit_cat', qs.stringify(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded' }})
      .then( (response) => {
        console.log(response.data)
                 if(!response.data.error) {
                       this.setState({isDialogVisible: false, isloaded: false});
                       this.getCategories();
                 } else {
                   alert("No Posts Found!");
                 }
           }
         )
      .catch( (response) => console.log(response.message))
    }
   }

   //Confirm If user wants to delete category
   confirmAlert = (category_id) => {
     Alert.alert(
       'Delete Category',
       'Are You Sure',
       [
          {text: 'NO', onPress: () => console.log("NO")},
          {text: 'Yes', onPress: () => this.delCategories(category_id)}
       ]
     )
   }

   //This Function deletes a category
   delCategories = (category_id)  => {
    var x = {
          category_id : category_id
    }
    axios.
    post('http://android.dainikresult.com/signin/Api.php?apicall=del_cat', qs.stringify(x), {headers: {'Content-Type': 'application/x-www-form-urlencoded' }})
    .then( (response) => {
      console.log(response)
               if(!response.data.error) {
                 this.setState({isloaded: false})
                 this.getCategories();
               } else {
                 alert("There are some problem");
               }
         }
       )
    .catch( (response) => console.log(response.message))
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

            <View style={{alignItems: 'center'}}>
            <Form style={{width: 300, padding: 25}}>


              <Item regular floatingLabel style={{marginBottom: 20, borderRadius: 5}}>
                <Label style={{marginTop: -17, fontSize: 16}}>Category Name</Label>
                <Input onChangeText={(name) => this.setState({category_name: name})}/>
              </Item>
              <Button onPress={this.saveCategory.bind(this)} iconLeft full rounded>
                  <Icon name='plus' color={'white'} size={20}/>
                  <Text>Add</Text>
              </Button>
              </Form>
              </View>

              <View>
              <ConfirmDialog visible={this.state.isDialogVisible} title="Input New Category Name" onTouchOutside={() => this.setState({isDialogVisible: false})}
              animationType='fade'
              positiveButton={{
                title: "Change",
                onPress: () => this.updateCategory()
            }}
            negativeButton={{
                title: "Cancel",
                onPress: () => this.setState({isDialogVisible: false})
            }}>
                <View>
                <Item regular floatingLabel style={{borderRadius: 5}}>
                <Label style={{marginTop: -17, fontSize: 16}}>Category Name</Label>
                <Input onChangeText={(name) => this.setState({newCategoryName: name})}/>
              </Item>
                </View>
              </ConfirmDialog>


                  {this.state.isloaded ? <List><this.ShowData /></List> : <Spinner style={{flexDirection: 'row', alignItems: 'center', marginTop: 100}} color='blue' />}
              </View>

          </Container>
    );
  }
}

export default Categories;
