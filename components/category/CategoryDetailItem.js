import React,{useState,useEffect,forwardRef} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,Animated,Dimensions, TextInput } from 'react-native';
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

const REM = Dimensions.get('window').width / 375 

const CategoryButton = forwardRef((props,ref) => { 
  const [openAnime,setOpenAnime] = useState(new Animated.Value(0));
  const {
    name,setGrams,index,grams,
    id,darkMode,darkModeColor,darkModeTextColor,onPress,setDarkMode,
    setIngredientCategory,setTypeCategory,
    isType,category_page,category_pageRef,setCategoryPageRef,setCategoryPage,
    initialIngCategory,initalIngCategoryDetail,setSecondCategory,secondIngCategory,setThirdCategory,
    isAdd,ing,setIng,type,setType
    } = props;  

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.gramContainer}>
                <RevertNeumorphWrapper shadowColor={darkModeColor}>
                    <TextInput onChangeText={(e)=>setGrams({...grams,[name]:e})} style={{ ...styles.gramInput, backgroundColor: darkModeColor }} />
                </RevertNeumorphWrapper>
                <Text style={{ ...styles.gramText }}>g</Text>
            </View>
        </View>
    )
})
  
  const styles = StyleSheet.create({
     container:{  
        width:'300rem',
        height:'60rem',
        borderRadius:'15rem',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'10rem'
     }, 
     name:{
        fontSize:'14rem'
     },
     gramContainer:{
        flexDirection:'row', 
     }, 
     gramInput:{
        width:'100rem', 
        height:'30rem',
        borderRadius:'5rem'
     },
     gramText:{
        marginLeft:'10rem',
        fontSize:'14rem',
        lineHeight:'30rem'
     }
     
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