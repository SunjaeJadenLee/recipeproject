import React,{useState} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import NeumophWrapper from './NeumophWrapper'
import CategoryButton from './buttons/CategoryButton'

const CategoryList = (props) => {
  const [toggle, setToggle] = useState(false);
  const { darkMode, darkModeColor, darkModeTextColor, data,isType } = props;
  return (
    <View style={styles.container}>
      {data.map(e =>
        <CategoryButton name={e} isType={isType}/>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#EAEAEA',
    width: '375rem',
    paddingHorizontal: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
    },
  });
  
  
  const mapStateToProp = (state) =>({
    darkMode: state.darkMode.darkMode,
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(CategoryList)