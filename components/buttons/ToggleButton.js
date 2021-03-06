import React,{useState,useEffect} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView,AsyncStorage } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'

import NeumorphWrapper from '../NeumorphWrapper'
import RevertNeumorphWrapper from '../RevertNeumorphWrapper'
import { setDarkMode } from '../../redux/actions';

const ToggleButton = (props) => {
  const [onOff,setOnOff] = useState(false);
  const {name,darkMode,darkModeColor,darkModeTextColor,onPress,setDarkMode,setIsEdit,isEdit,editUserProfile,userinfo} = props;

  useEffect(() => { 
    // setOnOff(props.darkMode); 
    switch (onPress) {
      case 'question': 
        AsyncStorage.getItem('question').then(result=>{
          if(result == 'true' || null){ 
            setOnOff(true)
          } else {
            setOnOff(false)
          }
        })
        break;
      case 'darkMode':
          AsyncStorage.getItem('darkMode').then(result=>{
            if(result == 'true'){
              setOnOff(true)
            } else {
              setOnOff(false)
            }
          })
          break;
      case undefined:
          setOnOff(false)
    

      default:
        break;
    }
  },[]) 

  const onButtonPress = (onPress) =>{ 
    switch(onPress){
      case 'darkMode': 
        setOnOff(!darkMode);
        setDarkMode(!darkMode);
        AsyncStorage.getItem('darkMode').then(result=>{  
          result == 'true'? AsyncStorage.setItem('darkMode','false') : AsyncStorage.setItem('darkMode','true')
        })
        break;
      case 'question':
        setOnOff(!onOff); 
        AsyncStorage.getItem('question').then(result=>{  
          result == 'true'? AsyncStorage.setItem('question','false') : AsyncStorage.setItem('question','true')
        })
        break;

      case 'profile':
        setOnOff(!onOff);
        // setIsEdit(!isEdit);
        if(!isEdit == true){ 
          setIsEdit(!isEdit);
        } else { 
          editUserProfile(userinfo.user ? userinfo.user.name : userinfo.nickname,userinfo.user ? userinfo.user.photo : userinfo.profileUrl);
        } 
        break;
    }
  } 

  onPress =='question' &&console.log('render question: '+ onOff)

    return (
      <>
        {onOff?<RevertNeumorphWrapper shadowColor={onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor}>
          <TouchableOpacity onPress={()=>{
            onButtonPress(onPress)
          }}>
            <View style={{ ...styles.container, backgroundColor: onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor }}>
              <FontAwesome iconStyle={styles.icon} color={darkModeTextColor} name={name} size={16} />
            </View>
          </TouchableOpacity>
        </RevertNeumorphWrapper>
        :<NeumorphWrapper shadowColor={onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor}>
        <TouchableOpacity onPress={()=>{
          onButtonPress(onPress)
        }}>
          <View style={{ ...styles.container, backgroundColor: onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor }}>
            <FontAwesome iconStyle={styles.icon} color={darkModeTextColor} name={name} size={16} />
          </View>
        </TouchableOpacity>
      </NeumorphWrapper>}
      </>
    );
  }
  
  const styles = StyleSheet.create({
     container:{ 
       width:50,
       height:50,
       borderRadius:25,
       justifyContent:'center',
       alignItems:'center'
     },
     icon:{ 
     }
  });
  
  
  const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor,
    darkMode:state.darkMode.darkMode,
    userinfo:state.auth.userinfo
  })
  
  const mapDispatchToProp = (dispatch) =>({
    setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode))
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(ToggleButton)