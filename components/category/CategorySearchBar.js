import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View,TextInput,Dimensions } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import RevertNeumorphWrapper from '../RevertNeumorphWrapper'
import CategoryButton from '../buttons/CategoryButton' 
import SquareButton from '../buttons/SquareButton'
import NeumorphWrapper from '../NeumorphWrapper';
 
const REM = Dimensions.get('window').width / 375

const CategoryList = (props) => {
  const {darkMode,darkModeColor,darkModeTextColor,data} = props;
    return (
        <View style={styles.container}>
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
                <View style={{ ...styles.inputContainer, backgroundColor: darkModeColor }}>
                    <TextInput style={{...styles.input,color:darkModeTextColor}}/>
                </View>
            </RevertNeumorphWrapper>
            <View style={{marginLeft:10*REM}}>
                <NeumorphWrapper shadowColor={darkModeColor}>
                    <TouchableOpacity>
                        <SquareButton name={'plus'} color={darkModeColor} />
                    </TouchableOpacity>
                </NeumorphWrapper>
            </View> 
        </View> 
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#EAEAEA',
      width:'100%', 
      height:'40rem', 
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginVertical:'18rem'
    },
    inputContainer:{
        width:'270rem',
        height:'40rem',
        borderRadius:'15rem'
    },
    input:{
        width:'270rem',
        height:'40rem',
        paddingHorizontal:'20rem'
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