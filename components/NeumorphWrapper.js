import * as React from 'react';
import color from 'color'
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'

const NeumorphWrapper = props => {
    const {children,shadowColor,style} = props;

    return (
        <View style={{...style,...styles.inputContainerTop,shadowColor:color(shadowColor).lighten(0.5).alpha(0.5)}}>
            <View style={{...styles.inputContainerBottom,shadowColor:color(shadowColor).darken(0.3).alpha(0.5)}}>
                {children}
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    inputContainerTop: {
        // backgroundColor:'rgb(60,95,96)',  
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        // marginBottom: 30,  
        // borderRadius:20
    },
    inputContainerBottom: { 
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
  });
  
  
  export default NeumorphWrapper