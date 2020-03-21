import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'

import {connect} from 'react-redux'

import NeumophWrapper from '../NeumophWrapper'

const ToggleButton = (props) => {
  const {name,darkModeColor,darkModeTextColor} = props;
    return (
        <NeumophWrapper shadowColor={darkModeColor}>
            <TouchableOpacity>
            <View style={{...styles.container,backgroundColor:darkModeColor}}>
                <FontAwesome iconStyle={styles.icon} color={darkModeTextColor} name={name} size={16} />
            </View>
            </TouchableOpacity> 
        </NeumophWrapper> 
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
    darkModeColor: state.darkModeColor,
    darkModeTextColor:state.darkModeTextColor
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(ToggleButton)