import React,{useState,useEffect,forwardRef} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'

import color from 'color'
import NeumorphWrapper from '../NeumorphWrapper'
import RevertNeumorphWrapper from '../RevertNeumorphWrapper'
import { setDarkMode } from '../../redux/actions';
import {setIngredientCategory,setTypeCategory,
  setCategoryPageRef,setCategoryPage,
  setSecondCategory,setThirdCategory
} from '../../redux/categoryActions'

const CategoryButton = forwardRef((props,ref) => {
  const [onOff,setOnOff] = useState(false);
  const {
    ingredient,selectList,setRefs,refs,
    name,id,darkMode,darkModeColor,darkModeTextColor,onPress,setDarkMode,
    setIngredientCategory,setTypeCategory,
    isType,category_page,category_pageRef,setCategoryPageRef,setCategoryPage,
    initialIngCategory,initalIngCategoryDetail,setSecondCategory,secondIngCategory,setThirdCategory,
    isAdd,ing,setIng,type,setType
    } = props;

    useEffect(()=>{
      if(type){
        type.includes(name)?setOnOff(true):setOnOff(false)
      } else if(ing){
        ing.includes(name)?setOnOff(true):setOnOff(false)
      } 
    },[])
    
    return (
      <>
        {!onOff?<NeumorphWrapper shadowColor={darkModeColor}>
            <TouchableOpacity onPress={()=>{

              if(isType){
                if(category_page!==2){
                  switch(category_page){
                    case 0:  
                      let categories = initialIngCategory.filter(e=>e.initial_category==name)
                      setSecondCategory(categories);
                      break;
                    case 1:  
                      let secCategories = initalIngCategoryDetail.filter(e=>e.category_id==id).map(e=>e.name)
                      setThirdCategory(secCategories);
                      break;
                  }
                  category_pageRef.current.scrollToIndex({index:category_page+1||0});
                  setCategoryPage(category_page+1)
                } 
              } 
              else if(!isType&&isAdd){
                setType?setType([...type,name]):setIng([...ing,name])
                setOnOff(!onOff)
              }
              else {
                if(category_page==2){

                }
                setIngredientCategory(name);setOnOff(!onOff)
              }
              }}>
                <View style={{...styles.container,backgroundColor:darkModeColor}}>
                   <Text style={{color:darkModeTextColor}}>{name}</Text> 
                </View>
            </TouchableOpacity>
        </NeumorphWrapper>
        :<RevertNeumorphWrapper shadowColor={darkModeColor}>
            <TouchableOpacity onPress={()=>{
              if(isType){
                
              } else if(isAdd){ 
                setType?setType(type.filter(e=>e!=name)):setIng(ing.filter(e=>e!=name));
                setOnOff(!onOff)
              } 
              else {
                setIngredientCategory(name);setOnOff(!onOff)
              }
            }}>
                <View style={{...styles.container,backgroundColor:darkModeColor}}>
                   <Text style={{color:color('rgb(60,95,96)').lighten(0.6)}}>{name}</Text> 
                </View>
            </TouchableOpacity>
        </RevertNeumorphWrapper>}
        
        </>
          )
  })
  
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
    initalIngCategoryDetail:state.category.initalIngCategoryDetail,
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