import React,{useRef,useEffect} from 'react';
import { Image, Platform, Animated, TouchableOpacity, View, SafeAreaView,ScrollView,Dimensions, FlatList } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'

import FastImage from 'react-native-fast-image'

import {connect} from 'react-redux'
import {setDarkMode} from '../redux/actions'
import {setCategoryPage,setCategoryPageRef} from '../redux/categoryActions'

import RevertNeumorphWrapper from './RevertNeumorphWrapper'
import NeumorphWrapper from './NeumorphWrapper'
import { FontAwesome } from '@expo/vector-icons';
import SquareButton from './buttons/SquareButton';

const REM = Dimensions.get('window').width / 375

const RecipeBox = (props) => {
  const { navigation,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
    category_type,selected_category,category_ingredient,
    category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
    secondIngCategory,thirdIngCategory,
    index,length,item,isFooter
  } = props;
  // item&&console.log(item.image_urls[0])

  return (
    <RevertNeumorphWrapper shadowColor={darkModeColor}>
      <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
        {typeof item == 'string' && <NeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={()=>navigation.navigate('recipe')}>
            <SquareButton color={darkModeColor} name={'plus'} textColor={darkModeTextColor} />
          </TouchableOpacity>
        </NeumorphWrapper>}
        {(item&&item.image_urls)&&<FastImage style={styles.image} source={{uri:item.image_urls[0],scale:0.00000001}}/>}
      </View>
    </RevertNeumorphWrapper>
  );
}

const styles = StyleSheet.create({
  container: { 
    width:'100rem',
    height:'100rem',
    marginTop:'15rem',
    marginLeft:'12.5rem',
    borderRadius:'15rem',
    justifyContent:'center',
    alignItems:'center'
  }, 
  plusIcon:{
    justifyContent:'center',
    alignItems:'center',
    width:'40rem',
    height:'40rem',
    borderRadius:'15rem'
  },
  image:{
    width:'100rem',
    height:'100rem',
    borderRadius:'15rem'
  }
});


const mapStateToProp = (state) =>({
  darkModeColor: state.darkMode.darkModeColor,
  darkModeTextColor:state.darkMode.darkModeTextColor,
  darkMode:state.darkMode.darkMode,
  selected_category:state.category.selected_category,
  category_type:state.category.category_type,
  category_ingredient:state.category.category_ingredient,
  secondIngCategory:state.category.secondIngCategory,
  thirdIngCategory:state.category.thirdIngCategory,
  category_page:state.category.category_page,
  category_pageRef:state.category.category_pageRef
})

const mapDispatchToProp = (dispatch) =>({
  setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode)),
  setCategoryPage: (page) => dispatch(setCategoryPage(page)),
  setCategoryPageRef: (ref) =>dispatch(setCategoryPageRef(ref))
})


export default connect(mapStateToProp,mapDispatchToProp)(RecipeBox)