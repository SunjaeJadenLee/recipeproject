import * as React from 'react';
import color from 'color'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';

const RevertNeumophWrapper = props => {
    const {children,shadowColor} = props;

    return (
        <View style={{...styles.revertInputContainerTop,shadowColor:color(shadowColor).darken(0.3).alpha(0.5)}}>
            <View style={{...styles.revertInputContainerBottom,shadowColor:color(shadowColor).lighten(0.5).alpha(0.5)}}>
                {children}
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    revertInputContainerTop:{ 
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    revertInputContainerBottom:{ 
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        marginBottom:30
    },
  });
  
  
  export default RevertNeumophWrapper