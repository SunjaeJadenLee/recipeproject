import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'

import {connect} from 'react-redux'

import ToggleButton from './buttons/ToggleButton'

const SettingListItem = (props) => {
  const {name,icon,darkModeColor,darkModeTextColor,onPress,setIsEdit,isEdit} = props;
    return (
        <View style={styles.container}> 
                <Text style={{...styles.itemText,color:darkModeTextColor}}>{name}</Text> 
                <ToggleButton name={icon} onPress={onPress} setIsEdit={setIsEdit} isEdit={isEdit}/> 
        </View>
    );
  }
  
  const styles = StyleSheet.create({
     container:{ 
       width:'100%',
       height:100, 
       justifyContent:'space-between',
       alignItems:'center',
       flexDirection:'row',
       paddingHorizontal:60
     }, 
     itemText:{
        fontSize:16,    
        fontWeight:'700'
        },
     icon:{ 
     }
  });
  
  
  const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(SettingListItem)