import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

const SquareButton = (props) => {
  const {name,color,textColor} = props;
    return (
      <View style={{...styles.container,backgroundColor:color}}>
        <FontAwesome iconStyle={styles.icon} color={textColor} name={name} size={16} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
     container:{ 
       width:40,
       height:40,
       borderRadius:10,
       justifyContent:'center',
       alignItems:'center',  
     },
     icon:{ 
     }
  });
  
  
  export default SquareButton