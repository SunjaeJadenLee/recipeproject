import React,{useState} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import NeumorphWrapper from '../NeumorphWrapper'
import CategoryButton from '../buttons/CategoryButton'

const CategoryList = (props) => {

const { darkMode, darkModeColor, darkModeTextColor, data,isType, ingredient,selectList,setRefs,refs,
      isAdd,ing,setIng,type,setType } = props;

  return (
    <View style={styles.container}> 
      {data.map((e,i) =>
        <CategoryButton key={e} refs={refs} setRefs={setRefs} selectList={selectList} ingredient={ingredient} name={typeof e == 'object'?e.name:e} id={typeof e == 'object' ? e.id:null} isType={isType}
          isAdd={isAdd} setIng={setIng} ing={ing} type={type} setType={setType}/>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
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