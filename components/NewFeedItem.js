import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View,FlatList,Dimensions } from 'react-native';
import {Ionicons,AntDesign,Entypo} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import NeumophWrapper from './NeumophWrapper'
import SquareButton from './buttons/SquareButton'
const REM = Dimensions.get('window').width / 375


const NewFeedItem = (props) => {
  const {name,icon,darkModeColor,darkModeTextColor,onPress} = props;
    return (
        <NeumophWrapper shadowColor={darkModeColor}>
            <View style={{...styles.container,backgroundColor:darkModeColor}}>
                <View style={styles.header}>
                  <View style={styles.icon}>
                  <Entypo color={darkModeTextColor} name={'dots-three-vertical'} size={18*REM} />
                  </View>
                </View>
            </View>
        </NeumophWrapper> 
    );
  }
  
  const styles = StyleSheet.create({
    container: { 
        width:'90%', 
        marginLeft:'5%',
        borderRadius:'25rem',
        height:'270rem',
        marginVertical:'10rem'
    }, 
    header:{
      width:'100%',
      paddingHorizontal:'10rem'
    },
    icon:{
      marginLeft:'auto',
      marginTop:'10rem'
    }
  });
  
  
  const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(NewFeedItem)