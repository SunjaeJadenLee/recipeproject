import React, { useState, useEffect } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, SafeAreaView, Dimensions, TextInput, Alert, AsyncStorage } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyleSheet from 'react-native-extended-stylesheet'
import {getCameraPermissionsAsync,getCameraRollPermissionsAsync,launchImageLibraryAsync} from 'expo-image-picker'
import firebase from 'react-native-firebase'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper'
import ScreenHeader from '../../components/ScreenHeader'
import SettingListItem from '../../components/SettingListItem'

import { connect } from 'react-redux'
import { setDarkMode } from '../../redux/actions'
import {setUserinfo} from '../../redux/authActions'
import FastImage from 'react-native-fast-image';
import { FontAwesome } from '@expo/vector-icons'; 
const REM = Dimensions.get('window').width / 375

const SettingScreen = (props) => {
  const { navigation, darkModeColor, darkModeTextColor, darkMode, setDarkMode, userinfo,setUserinfo } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editedNickname,setEditedNickname] = useState(userinfo.user ? userinfo.user.name : userinfo.nickname);
  const [editedProfile,setEditedProfile] = useState(userinfo.user ? userinfo.user.photo : userinfo.profileUrl);
  const [editPhoto,setEditPhoto] = useState(null);
  const editProfileImage = () =>{
    getCameraRollPermissionsAsync().then(e=>{
      launchImageLibraryAsync({allowsMultipleSelection:false,}).then(image=>{
        console.log(image)
        if(!image.cancelled){ 
          setEditedProfile(image.uri);
          setEditPhoto(image); 
        } 
      })
    })
  }

  const editUserProfile = (nickname,photo) =>{
    if(editedNickname!=nickname|| editedProfile != photo){
      Alert.alert('수정','프로필을 수정하시겠습니까?',[
        { text:'확인',onPress:()=>{
          if(editPhoto){
            firebase.storage().ref('profile').child(editPhoto.uri.split('/')[editPhoto.uri.split('/').length - 1]).putFile(editPhoto.uri).then(uploaded => {
              console.log('image@@@@@@@@@@@@@@')
              let headers = new Headers();
              let formData = new FormData();
              headers.append('Content-Type', 'multipart/form-data');
              headers.append('Accept', 'application/json')
              formData.append('nickname', editedNickname);
              formData.append('platform', userinfo.platform);
              formData.append('email', userinfo.email);
              formData.append('id', userinfo.id);
              console.log(uploaded.downloadURL)
              formData.append('image', uploaded.downloadURL)
              fetch('http://localhost:5000/editUser', {
                method: 'POST',
                headers: headers,
                body: formData
              }).then(res => res.json().then(resJson => {
                alert('프로필 수정이 완료되었습니다.')
                console.log(resJson);
                setUserinfo(resJson);
                AsyncStorage.setItem('userinfo', JSON.stringify(resJson)).then(result => {
                  setIsEdit(false)
                })
              }))
            });
          } else {
            let headers = new Headers();
            let formData = new FormData();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json')
            formData.append('nickname', editedNickname);
            formData.append('platform', userinfo.platform);
            formData.append('email', userinfo.email);
            formData.append('id', userinfo.id); 
            fetch('http://localhost:5000/editUser', {
              method: 'POST',
              headers: headers,
              body: formData
            }).then(res => res.json().then(resJson => {
              alert('프로필 수정이 완료되었습니다.')
              console.log(resJson);
              setUserinfo(resJson);
              AsyncStorage.setItem('userinfo', JSON.stringify(resJson)).then(result => {
                setIsEdit(false)
              })
            }))
          }
        }},
        { text:'취소',onPress:()=>{
          setEditedNickname(nickname);
          setEditedProfile(photo);
          setIsEdit(false)
        }}
      ])
    } else { 
      setEditedNickname(nickname);
      setEditedProfile(photo);
      setIsEdit(false);
    }
  }
  
  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
      <SafeAreaView />
      <ScreenHeader title={'SETTING'} navigation={navigation} />
      {isEdit ?
        <View style={styles.profileContainer}>
          <View style={{ marginLeft: 40 * REM, marginRight: 20 * REM }}>
            <NeumorphWrapper shadowColor={darkModeColor}>
              <TouchableWithoutFeedback onPress={()=>editProfileImage()}>
                <View style={{ ...styles.profileImageContainer, backgroundColor: darkModeColor }}>
                  <FastImage style={{...styles.image,opacity:0.4}} source={{ uri: editedProfile }} />
                  <View style={{position:'absolute',bottom:37*REM,right:37*REM}}>
                    <FontAwesome size={16*REM} name={'pencil'}/>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </NeumorphWrapper>
          </View>
          <View style={styles.profileContentContainer}> 
            <Text style={{ ...styles.profileContentText, color: darkModeTextColor }}>{userinfo.user ? userinfo.user.email : userinfo.email}</Text>
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
              <TextInput style={{...styles.editInput,backgroundColor:darkModeColor,color:darkModeTextColor}} value={editedNickname} onChangeText={e=>setEditedNickname(e)}/>
            </RevertNeumorphWrapper>
          </View>
        </View>
        : <View style={styles.profileContainer}>
          <View style={{ marginLeft: 40 * REM, marginRight: 20 * REM }}>
            <NeumorphWrapper shadowColor={darkModeColor}>
              <View style={{ ...styles.profileImageContainer, backgroundColor: darkModeColor }}>
                <FastImage style={styles.image} source={{ uri: editedProfile }} />
              </View>
            </NeumorphWrapper>
          </View>
          <View style={styles.profileContentContainer}>
            <Text style={{ ...styles.profileContentText, color: darkModeTextColor }}>{userinfo.user ? userinfo.user.email : userinfo.email}</Text>
            <Text style={{ ...styles.profileContentText, color: darkModeTextColor,marginTop:5*REM }}>{userinfo.user ? userinfo.user.name : userinfo.nickname}</Text>
          </View>
        </View>}
      <View style={styles.settingContainer}>
        <SettingListItem name={'푸시 알람'} icon={'bell-o'} />
        <SettingListItem name={'다크 모드'} icon={'adjust'} onPress={'darkMode'} />
        <SettingListItem name={'프로필 변경'} icon={'pencil'} setIsEdit={setIsEdit} isEdit={isEdit} editUserProfile={editUserProfile} onPress={'profile'} />
        <SettingListItem name={'도움말'} icon={'question'} onPress={'question'} />
        <SettingListItem name={'디버깅'} icon={'gear'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: '20rem'
  },
  profileImageContainer: {
    width: '90rem',
    height: '90rem',
    borderRadius: '25rem',
  },
  image: {
    width: '90rem',
    height: '90rem',
    borderRadius: '25rem',
  },
  profileContentContainer: {
    justifyContent: 'center',
    height: '90rem'
  },
  profileContentText: {
    fontSize: '14rem',
    fontWeight: '900'
  },
  settingContainer: {

  },
  editButton:{
    width:'20rem',
    height:'20rem',
    borderRadius:'5rem',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10rem'
  },
  editInput:{
    marginTop:'5rem',
    width:'100rem',
    height:'20rem',
    fontWeight:'900',
    // lineHeight:'30rem',
    paddingLeft:'10rem',
    borderRadius:'5rem'
  }
});


const mapStateToProp = (state) => ({
  darkModeColor: state.darkMode.darkModeColor,
  darkModeTextColor: state.darkMode.darkModeTextColor,
  darkMode: state.darkMode.darkMode,
  userinfo: state.auth.userinfo
})

const mapDispatchToProp = (dispatch) => ({
  setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  setUserinfo: (userinfo) =>dispatch(setUserinfo(userinfo))
})


export default connect(mapStateToProp, mapDispatchToProp)(SettingScreen)