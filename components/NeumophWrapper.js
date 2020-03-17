import * as React from 'react';
import color from 'color'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';

const NeumophWrapper = props => {
    const {children,shadowColor} = props;

    return (
        <View style={{...styles.inputContainerTop,shadowColor:color(shadowColor).lighten(0.5).alpha(0.5)}}>
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
        marginBottom: 30,  
        // borderRadius:20
    },
    inputContainerBottom: { 
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
  });
  
  
  export default NeumophWrapper