import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'

import NeumophWrapper from '../NeumophWrapper'

const ToggleButton = (props) => {
  const {name} = props;
    return (
        <NeumophWrapper shadowColor={'#EAEAEA'}>
            <TouchableOpacity>
            <View style={styles.container}>
                <FontAwesome iconStyle={styles.icon} name={name} size={16} />
            </View>
            </TouchableOpacity> 
        </NeumophWrapper> 
    );
  }
  
  const styles = StyleSheet.create({
     container:{
       backgroundColor:'#EAEAEA', 
       width:50,
       height:50,
       borderRadius:25,
       justifyContent:'center',
       alignItems:'center'
     },
     icon:{ 
     }
  });
  
  
  export default ToggleButton