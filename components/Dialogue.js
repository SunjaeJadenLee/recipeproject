import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { Text, Image, Animated, View, SafeAreaView, ScrollView, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'

import FastImage from 'react-native-fast-image'
import color from 'color'
import { connect } from 'react-redux'
import { setDarkMode } from '../redux/actions'
import { setCategoryPage, setCategoryPageRef } from '../redux/categoryActions'

import RevertNeumorphWrapper from './RevertNeumorphWrapper'
import NeumorphWrapper from './NeumorphWrapper'
import { FontAwesome } from '@expo/vector-icons';
import SquareButton from './buttons/SquareButton';

const REM = Dimensions.get('window').width / 375

const Dialogue = (props, ref) => {
    const [animatedRight, setAnimatedRight] = useState(new Animated.Value(- 150 * REM));
    const [animatedTop, setAnimatedTop] = useState(new Animated.Value(50 * REM));
    const [type,setType] = useState(null);
    const [move,setMove] = useState(null);
    const { navigation, darkModeColor, darkModeTextColor, darkMode, setDarkMode,
        category_type, selected_category, category_ingredient,
        category_page, setCategoryPage, setCategoryPageRef, category_pageRef,
        secondIngCategory, thirdIngCategory,
        index, length, item, isFooter,
        scrollViewRef, dialogueType, dialogueMove
    } = props; 

    useEffect(()=>{
        console.log('move@@@@@@@@@@@@@@')
        console.log(dialogueMove)
        if(dialogueMove == 'in')
        {
            moveinDialogue('in','complete');
        }  

    },[dialogueMove]) 

    useEffect(()=>{ 
        if(dialogueType=='error'){
            setTimeout(() => {
                moveoutDialogue();
            }, 4000);
        } else if(dialogueType=='loading'){
            
        } else if (dialogueType == 'complete'){
            setTimeout(() => {
                moveoutDialogue();
            }, 4000);
        }
    },[dialogueType])

    const moveinDialogue = () => {
        Animated.timing(animatedRight, {
            toValue: 10 * REM,
        }).start();
    }

    const moveoutDialogue = () => {
        Animated.timing(animatedTop, {
            toValue: -50 * REM,
            delay: 2000
        }).start();
    }
  
    return (
        <Animated.View style={{ ...styles.container, backgroundColor: color(darkModeTextColor).alpha(0.5), top: animatedTop, right: animatedRight }}>
            {dialogueType == 'loading' && <><Image style={styles.icon} source={require('../assets/images/loading.png')} />
                <Text style={{ ...styles.text, color: darkModeColor }}>로딩중입니다.</Text></>}
            {dialogueType == 'complete'&&<><Image style={styles.icon} source={require('../assets/images/complete.png')} />
                <Text style={{ ...styles.text, color: darkModeColor }}>완료</Text></>}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '150rem',
        height: '50rem',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: '14rem',
        fontWeight: '700'
    },
    icon: {
        width: '20rem',
        height: '20rem',
        marginRight: '20rem'
    }
});


const mapStateToProp = (state) => ({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor: state.darkMode.darkModeTextColor,
    darkMode: state.darkMode.darkMode,
    selected_category: state.category.selected_category,
    category_type: state.category.category_type,
    category_ingredient: state.category.category_ingredient,
    secondIngCategory: state.category.secondIngCategory,
    thirdIngCategory: state.category.thirdIngCategory,
    category_page: state.category.category_page,
    category_pageRef: state.category.category_pageRef, 
    dialogueType: state.dialogue.dialogueType
})

const mapDispatchToProp = (dispatch) => ({
    setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
    setCategoryPage: (page) => dispatch(setCategoryPage(page)),
    setCategoryPageRef: (ref) => dispatch(setCategoryPageRef(ref))
})


export default connect(mapStateToProp, mapDispatchToProp)(Dialogue)