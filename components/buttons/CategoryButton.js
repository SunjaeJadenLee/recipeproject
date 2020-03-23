import React,{useState,useEffect} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'

import NeumophWrapper from '../NeumophWrapper'
import RevertNeumophWrapper from '../RevertNeumophWrapper'
import { setDarkMode } from '../../redux/actions';
import {setIngredientCategory,setTypeCategory,
  setCategoryPageRef,setCategoryPage,
  setSecondCategory,setThirdCategory
} from '../../redux/categoryActions'

const CategoryButton = (props) => {
  const [onOff,setOnOff] = useState(false);
  const {name,darkMode,darkModeColor,darkModeTextColor,onPress,setDarkMode,
    setIngredientCategory,setTypeCategory,
    isType,category_page,category_pageRef,setCategoryPageRef,setCategoryPage,
    initialIngCategory,setSecondCategory,secondIngCategory,setThirdCategory
    } = props;
    
    return (
      <>
        {!onOff?<NeumophWrapper shadowColor={darkModeColor}>
            <TouchableOpacity onPress={()=>{
              if(isType){
                if(category_page!==2){
                  switch(category_page){
                    case 0:
                      let categories = initialIngCategory.filter(e=>e.initial_category==name).map(e=>e.name)
                      setSecondCategory(categories);
                      break;
                    case 1:
                      let secCategories = secondIngCategory.filter(e=>e.initial_category==name).map(e=>e.name)
                      setThirdCategory(secCategories);
                      break;
                  }
                  category_pageRef.current.scrollToIndex({index:category_page+1||0});
                  setCategoryPage(category_page+1)
                } 
              } else {
                setIngredientCategory(name);setOnOff(!onOff)
              }
              }}>
                <View style={{...styles.container,backgroundColor:darkModeColor}}>
                   <Text style={{color:darkModeTextColor}}>{name}</Text> 
                </View>
            </TouchableOpacity>
        </NeumophWrapper>
        :<RevertNeumophWrapper shadowColor={darkModeColor}>
            <TouchableOpacity onPress={()=>{
              if(isType){
                
              } else {
                setIngredientCategory(name);setOnOff(!onOff)
              }
            }}>
                <View style={{...styles.container,backgroundColor:darkModeColor}}>
                   <Text style={{color:darkModeTextColor}}>{name}</Text> 
                </View>
            </TouchableOpacity>
        </RevertNeumophWrapper>}
        
        </>
          )
  }
  
  const styles = StyleSheet.create({
     container:{  
        width:'50rem',
        height:'25rem',
        borderRadius:'15rem',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'10rem',
        marginVertical:'5rem'
     }, 
  });
  
  
  const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor,
    darkMode:state.darkMode.darkMode,
    initialIngCategory:state.category.initialIngCategory,
    secondIngCategory:state.category.secondIngCategory,
    category_page:state.category.category_page,
    category_pageRef:state.category.category_pageRef
  })
  
  const mapDispatchToProp = (dispatch) =>({
    setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode)),
    setIngredientCategory: (category) =>dispatch(setIngredientCategory(category)),
    setCategoryPage: (page) => dispatch(setCategoryPage(page)),
    setCategoryPageRef: (ref) =>dispatch(setCategoryPageRef(ref)),
    setSecondCategory: (category) =>dispatch(setSecondCategory(category)),    
    setThirdCategory: (category) =>dispatch(setThirdCategory(category)),
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(CategoryButton)