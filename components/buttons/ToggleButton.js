import React,{useState,useEffect} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'

import NeumophWrapper from '../NeumophWrapper'
import RevertNeumophWrapper from '../RevertNeumophWrapper'
import { setDarkMode } from '../../redux/actions';

const ToggleButton = (props) => {
  const [onOff,setOnOff] = useState(false);
  const {name,darkMode,darkModeColor,darkModeTextColor,onPress,setDarkMode} = props;

  useEffect(() => { 
    setOnOff(props.darkMode);
  },[]) 

  const onButtonPress = (onPress) =>{ 
    switch(onPress){
      case 'darkMode': 
        setOnOff(!darkMode);
        setDarkMode(!darkMode);
        break;
    }
  }

    return (
      <>
        {onOff?<RevertNeumophWrapper shadowColor={onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor}>
          <TouchableOpacity onPress={()=>{
            onButtonPress(onPress)
          }}>
            <View style={{ ...styles.container, backgroundColor: onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor }}>
              <FontAwesome iconStyle={styles.icon} color={darkModeTextColor} name={name} size={16} />
            </View>
          </TouchableOpacity>
        </RevertNeumophWrapper>
        :<NeumophWrapper shadowColor={onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor}>
        <TouchableOpacity onPress={()=>{
          onButtonPress(onPress)
        }}>
          <View style={{ ...styles.container, backgroundColor: onOff && name == 'adjust' ? 'rgb(239,219,150)' : darkModeColor }}>
            <FontAwesome iconStyle={styles.icon} color={darkModeTextColor} name={name} size={16} />
          </View>
        </TouchableOpacity>
      </NeumophWrapper>}
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
    darkMode:state.darkMode.darkMode
  })
  
  const mapDispatchToProp = (dispatch) =>({
    setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode))
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(ToggleButton)