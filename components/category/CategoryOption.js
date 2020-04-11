import React,{useState,useEffect,forwardRef} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,Animated,Dimensions } from 'react-native';
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
  const [onOff,setOnOff] = useState(false);
  const [openAnime,setOpenAnime] = useState(new Animated.Value(0));
  const {
    text,open,setOpen,
    name,id,darkMode,darkModeColor,darkModeTextColor,onPress,setDarkMode,
    setIngredientCategory,setTypeCategory,
    isType,category_page,category_pageRef,setCategoryPageRef,setCategoryPage,
    initialIngCategory,initalIngCategoryDetail,setSecondCategory,secondIngCategory,setThirdCategory,
    isAdd,ing,setIng,type,setType
    } = props; 
    // const setOpen = () =>{
    //     if(!onOff){
    //         Animated.timing(openAnime,{
    //             toValue:100,
    //             duration:300
    
    //         }).start();
    //         setOnOff(true)
    //     } else {
    //         Animated.timing(openAnime,{
    //             toValue:0,
    //             duration:300 
    //         }).start();
    //         setOnOff(false);

    //     }
        
    // }

    return (
        <NeumorphWrapper shadowColor={darkModeColor}> 
            <TouchableOpacity onPress={()=>setOpen()}>
                <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
                    <Text style={styles.containerText}>{text}</Text>
                    <View style={styles.leftIcon}><FontAwesome size={20 * REM} name={'sort-down'} />
                    </View>
                </View>
            </TouchableOpacity> 
        </NeumorphWrapper>
          )
  })
  
  const styles = StyleSheet.create({
     container:{  
        width:'300rem',
        height:'60rem',
        borderRadius:'15rem',
        flexDirection:'row',
        alignItems:'center', 
        marginTop:'10rem'
     }, 
     leftIcon:{
         marginLeft:'auto',
         marginRight:'20rem'
     },
     containerText:{ 
        marginLeft:'40rem',
         fontSize:'16rem',
         fontWeight:'700',
         textAlign:'center'
     },
     contentContainer:{
        width:'300rem', 
        height:'1rem',
        marginTop:'70rem'
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