import React,{useRef,useEffect, useState} from 'react';
import { Text, Platform, Animated, View, SafeAreaView,ScrollView,Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
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
const tabs = ['피드','추천', '공지사항']
const animatedLeft = [20*REM,100*REM,180*REM]
const MainTabbar = (props) => {
    const [selectedBar,setSelectedBar] = useState(new Animated.Value(20*REM));
  const { navigation,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
    category_type,selected_category,category_ingredient,
    category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
    secondIngCategory,thirdIngCategory,
    index,length,item,isFooter,
    scrollViewRef,selectedTab
  } = props;

  useEffect(()=>{ 
    Animated.timing(selectedBar,{
        toValue:animatedLeft[selectedTab],
        duration:300, 
    }).start();
  },[selectedTab])  
    return (
        <View style={styles.container}>
            {tabs.map((e, i) => <TouchableWithoutFeedback onPress={()=>{
                scrollViewRef.current.goToPage(i); 
                }}>
                <View style={styles.tab}>
                    <Text style={{ ...styles.tabText, color: darkModeTextColor }}>{e}</Text>
                </View>
            </TouchableWithoutFeedback>
            )}
            <Animated.View style={{ ...styles.selected, backgroundColor: darkModeTextColor, left: selectedBar }} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {  
      width:'100%',
      flexDirection:'row',
      marginTop:'10rem'
  }, 
  tab: {
    width:'80rem',
    height:'40rem',
    justifyContent:'center',
    alignItems:'center'
  },
  tabText:{
    fontSize:'14rem',
    fontWeight:'900',
    lineHeight:'40rem',
    textAlignVertical:'center', 
  },
  selected:{
      width:'40rem',
      height:'2rem', 
      position:'absolute',
      top:'40rem'
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


export default connect(mapStateToProp,mapDispatchToProp)(MainTabbar)