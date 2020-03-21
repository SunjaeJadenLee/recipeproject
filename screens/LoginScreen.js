import React, { useState,useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import color from 'color'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
 
import {connect} from 'react-redux'
import {useColorScheme} from 'react-native-appearance'
import {setDarkMode} from '../redux/actions'

const LoginScreen = props => {
    let darkMode = useColorScheme()
    console.log(darkMode)
    useEffect(()=>{  
        props.setDarkMode(darkMode=='dark'?true:false)
    })

    return (
        <View style={styles.container}>
            <View><Text style={{ color: '#fff', fontSize: 60, fontWeight: 'bold', marginBottom: 100 }}>Title</Text></View>
            <View style={styles.inputContainerTop}>
                <View style={styles.inputContainerBottom}>
                    <View style={styles.inputInnerContainer}>
                        <TextInput style={styles.input} />
                    </View>
                </View>
            </View>
            <View style={styles.inputContainerTop}>
                <View style={styles.inputContainerBottom}>
                    <View style={styles.inputInnerContainer}>
                        <TextInput style={styles.input} />
                    </View>
                </View>
            </View>
            <View style={styles.checkboxContainer}>
                <View style={styles.revertInputContainerTop}>
                    <View style={styles.revertInputContainerBottom}>
                        <TouchableWithoutFeedback>
                            <View style={styles.checkbox}>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Text style={styles.checkboxText}>로그인 유지</Text>
            </View>
            
            <View style={styles.inputContainerTop}>
                <View style={styles.inputContainerBottom}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate("home")}>
                        <View style={styles.inputInnerContainer}>
                            <Text style={{ color: '#fff', lineHeight: 70, textAlign: 'center' }}>로그인</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(60,95,96)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainerTop: {
        // backgroundColor:'rgb(60,95,96)', 
        shadowColor: color('rgb(60,95,96)').lighten(0.5).alpha(0.5),
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        marginBottom: 30,
        // borderRadius:20
    },
    inputContainerBottom: {
        shadowColor: color('rgb(60,95,96)').darken(0.3).alpha(0.5),
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    revertInputContainerTop:{
        shadowColor: color('rgb(60,95,96)').darken(0.3).alpha(0.5),
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
    },
    revertInputContainerBottom:{
        shadowColor: color('rgb(60,95,96)').lighten(0.5).alpha(0.5),
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        marginBottom:30
    },
    inputInnerContainer: {
        width: 300,
        height: 70,
        backgroundColor: 'rgb(60,95,96)',
        borderRadius: 15
    },
    input: {
        paddingLeft: 20,
        width: 300,
        height: 70,
        fontSize: 16,
        textAlignVertical: 'center',
        color: '#fff'
    },
    checkboxContainer:{
        flexDirection:'row',
        width:300
    },
    checkbox:{
        width:20,
        height:20,
        backgroundColor: 'rgb(60,95,96)',
        marginLeft:20
    },
    checkboxText:{
        color:'#fff',
        marginLeft:20,
        fontWeight:'bold',
        lineHeight:20
    }
})


const mapStateToProp = state =>({
    darkModeColor: state.darkModeColor,
    darkModeTextColor:state.darkModeTextColor
})

const mapDispatchToProp = (dispatch) =>({
    setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode))
})


export default connect(mapStateToProp,mapDispatchToProp)(LoginScreen)