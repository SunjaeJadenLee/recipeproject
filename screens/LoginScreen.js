import React, { useState,useEffect } from 'react'
import { View, Text, TextInput, StyleSheet,AsyncStorage } from 'react-native'
import {GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-community/google-signin'
import color from 'color'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
 
import {connect} from 'react-redux'
import {useColorScheme} from 'react-native-appearance'
import {setDarkMode} from '../redux/actions'
import {setUserinfo} from '../redux/authActions'
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = props => {
    let [userInfo,setUserInfo] = useState(null);
    let [keepLoggedin,setKeepLoggedin] = useState(false);
    let darkMode = useColorScheme() 
    useEffect(()=>{  
        GoogleSignin.configure({
            webClientId:'1012084358432-8qjrvg5lut1vbj210t02sfsts7f6qr28.apps.googleusercontent.com',
            offlineAccess:true,
            hostedDomain:'',
            forceCodeForRefreshToken:true 
        })

        AsyncStorage.getItem('darkMode').then(result=>{
            if(result == null){
                props.setDarkMode(darkMode=='dark'?true:false)
            } else {
                result=='true'?props.setDarkMode(true):props.setDarkMode(false)
            }
        })

        AsyncStorage.getItem('userinfo').then(result=>{
            if(result){
                props.setUserinfo(JSON.parse(result));
                props.navigation.navigate('home'); 
            } 
        })
    },[])

    const signinWithGoogle = async () =>{
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.signIn().then(e=>{
                props.navigation.navigate('home');
                props.setUserinfo(e);
                console.log(e)
                if(keepLoggedin){
                    AsyncStorage.setItem('userinfo',JSON.stringify(e));
                }
            }); 

          } catch (error) {
              console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
    }   

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
                        <TouchableWithoutFeedback onPress={()=>setKeepLoggedin(!keepLoggedin)}>
                            <View style={styles.checkbox}>
                                {keepLoggedin&&<FontAwesome color={'#fff'} size={12} name={'check'}/>}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Text style={styles.checkboxText}>로그인 유지</Text>
            </View>
            <View style={styles.inputContainerTop}>
                <View style={styles.inputContainerBottom}>
                    <TouchableOpacity>
                        <View style={styles.inputInnerContainer}>
                            <Text style={{ color: '#fff', lineHeight: 70, textAlign: 'center' }}>로그인</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainerTop}>
                <View style={styles.inputContainerBottom}>
                    <TouchableOpacity onPress={signinWithGoogle}>
                        <View style={{...styles.inputInnerContainer,flexDirection:'row',justifyContent:'center'}}>
                            <FontAwesome style={styles.googleIcon} size={30} color={'#fff'} name={'google-plus'}/>
                            <Text style={{ color: '#fff', lineHeight: 70, textAlign: 'center' }}>구글 계정으로 로그인</Text>
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
        marginLeft:20,
        justifyContent:'center',
        alignItems:'center'
    },
    checkboxText:{
        color:'#fff',
        marginLeft:20,
        fontWeight:'bold',
        lineHeight:20
    },
    googleIcon:{
        lineHeight:70,
        marginRight:10
    }
})


const mapStateToProp = state =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor,
    userinfo:state.auth.userinfo
})

const mapDispatchToProp = (dispatch) =>({
    setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode)),
    setUserinfo: (userinfo) =>dispatch(setUserinfo(userinfo))
})


export default connect(mapStateToProp,mapDispatchToProp)(LoginScreen)