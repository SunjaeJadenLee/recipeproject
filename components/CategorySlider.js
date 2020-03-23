import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View,TextInput,Slider } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import color from 'color'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import RevertNeumophWrapper from './RevertNeumophWrapper'
import CategoryButton from './buttons/CategoryButton' 
import SquareButton from './buttons/SquareButton'
import NeumophWrapper from './NeumophWrapper';
 
const CategoryList = (props) => {
  const {darkMode,darkModeColor,darkModeTextColor,minVal,maxVal} = props;
    return (
        <View style={{...styles.container}}>
            <Slider 
            maximumTrackTintColor={'#ccc'}
            minimumTrackTintColor={color('rgb(60,95,96)').lighten(0.6)}
            style={styles.slider}
            minimumValue={minVal} 
            maximumValue={maxVal}/>
            <View style={styles.valueContainer}>
                <Text style={{...styles.value,color:darkModeTextColor}}>{minVal}</Text>
                <Text style={{...styles.value,color:darkModeTextColor}}>{(minVal+maxVal)/2}</Text>
                <Text style={{...styles.value,color:darkModeTextColor}}>{maxVal}</Text>
            </View>
        </View> 
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#EAEAEA',
      width:'100%', 
      height:40,  
      justifyContent:'center',
      alignItems:'center',
      marginVertical:20
    },
    slider:{
        width:300
    },
    valueContainer:{
        width:300,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    value:{
        fontSize:14,
        fontWeight:'700'
    }
  });
  
  
  const mapStateToProp = (state) =>({
    darkMode: state.darkMode.darkMode,
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(CategoryList)