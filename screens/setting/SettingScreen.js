import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View, SafeAreaView,Dimensions } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyleSheet from 'react-native-extended-stylesheet'

import RevertNeumophWrapper from '../../components/RevertNeumophWrapper'
import NeumophWrapper from '../../components/NeumophWrapper' 
import ScreenHeader from '../../components/ScreenHeader'
import SettingListItem from '../../components/SettingListItem'

import {connect} from 'react-redux'
import {setDarkMode} from '../../redux/actions'
const REM = Dimensions.get('window').width / 375

const SettingScreen = (props) => {
  const { navigation,darkModeColor,darkModeTextColor,darkMode,setDarkMode } = props;

  return (
    <View style={{...styles.container,backgroundColor:darkModeColor}}> 
          <SafeAreaView />
        <ScreenHeader title={'SETTING'} navigation={navigation} />
        <View style={styles.profileContainer}>
              <View style={{marginLeft:40*REM,marginRight:20*REM}}>
                  <NeumophWrapper shadowColor={darkModeColor}>
                      <View style={{...styles.profileImageContainer,backgroundColor:darkModeColor}}>

                      </View>
                  </NeumophWrapper>
              </View>
              <View style={styles.profileContentContainer}>
                  <Text style={{...styles.profileContentText,color:darkModeTextColor}}>dev.sunjaelee@gmail.com</Text>
                  <Text style={{...styles.profileContentText,color:darkModeTextColor}}>이 선재</Text>
              </View> 
          </View>
          <View style={styles.settingContainer}>
                <SettingListItem name={'푸시 알람'} icon={'bell-o'}/>
                <SettingListItem name={'다크 모드'} icon={'adjust'} onPress={'darkMode'}/>
                <SettingListItem name={'프로필 변경'} icon={'pencil'}/>
                <SettingListItem name={'디버깅'} icon={'gear'}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width:'100%',
    height:'100%' 
  }, 
  profileContainer:{
    flexDirection:'row',
    marginTop:'20rem'
  },
  profileImageContainer:{
      width:'90rem',
      height:'90rem',
      borderRadius:'25rem', 

  },
  profileContentContainer:{
    justifyContent:'center', 
    height:'90rem'
  },
  profileContentText:{
      fontSize:'14rem',
      fontWeight:'900'
  },
  settingContainer:{

  }
});


const mapStateToProp = (state) =>({
  darkModeColor: state.darkMode.darkModeColor,
  darkModeTextColor:state.darkMode.darkModeTextColor,
  darkMode:state.darkMode.darkMode
})

const mapDispatchToProp = (dispatch) =>({
  setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode))
})


export default connect(mapStateToProp,mapDispatchToProp)(SettingScreen)