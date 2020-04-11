import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import NeumorphWrapper from '../NeumorphWrapper'
import SquareButton from '../buttons/SquareButton'

import ToggleButton from '../buttons/ToggleButton'

const CategoryHeader = (props) => {
  const {name,icon,darkModeColor,darkModeTextColor,onPress,isType,category_page} = props;
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}><Text style={{ ...styles.headerText, color: darkModeTextColor }}>{name}</Text></View>
                {(onPress&&!isType)&&<NeumorphWrapper shadowColor={darkModeColor}>
                    <TouchableOpacity onPress={onPress}>
                        <SquareButton color={darkModeColor} name={'chevron-right'} textColor={darkModeTextColor} />
                    </TouchableOpacity>
                </NeumorphWrapper>}
                {(onPress&&isType&&category_page!==0)&&<NeumorphWrapper shadowColor={darkModeColor}>
                    <TouchableOpacity onPress={onPress}>
                        <SquareButton color={darkModeColor} name={'chevron-left'} textColor={darkModeTextColor} />
                    </TouchableOpacity>
                </NeumorphWrapper>}
            </View>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#EAEAEA',
      paddingHorizontal: '27rem',
      marginVertical:'10rem'
    },
    headerContainer: {
      width: '100%',
      textAlignVertical: 'center',
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    headerTextContainer: { 
    },
    headerText: {
      lineHeight: '40rem',
      fontSize: '18rem',
      fontWeight: 'bold'
    }
  });
  
  
  const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor,
    category_page:state.category.category_page,
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(CategoryHeader)