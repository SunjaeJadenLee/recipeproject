import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'

import ToggleButton from './buttons/ToggleButton'

const SquareButton = (props) => {
  const {name,icon} = props;
    return (
        <View style={styles.container}> 
                <Text style={styles.itemText}>{name}</Text> 
                <ToggleButton name={icon}/> 
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
  
  
  export default SquareButton