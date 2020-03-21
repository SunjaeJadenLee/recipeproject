import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RevertNeumophWrapper from '../../components/RevertNeumophWrapper'
import NeumophWrapper from '../../components/NeumophWrapper' 
import ScreenHeader from '../../components/ScreenHeader'
import SettingListItem from '../../components/SettingListItem'

import {connect} from 'react-redux'

const SettingScreen = (props) => {
  const { navigation,darkModeColor,darkModeTextColor } = props;

  return (
    <View style={{...styles.container,backgroundColor:darkModeColor}}> 
          <SafeAreaView />
        <ScreenHeader title={'SETTING'} navigation={navigation} />
        <View style={styles.profileContainer}>
              <View style={{marginLeft:40,marginRight:20}}>
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
                <SettingListItem name={'다크 모드'} icon={'adjust'}/>
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
    flexDirection:'row'
  },
  profileImageContainer:{
      width:100,
      height:100,
      borderRadius:25, 

  },
  profileContentContainer:{
    justifyContent:'center', 
    height:100
  },
  profileContentText:{
      fontSize:16,
      fontWeight:'900'
  },
  settingContainer:{

  }
});


const mapStateToProp = (state) =>({
  darkModeColor: state.darkModeColor,
  darkModeTextColor:state.darkModeTextColor
})

const mapDispatchToProp = (dispatch) =>({

})


export default connect(mapStateToProp,mapDispatchToProp)(SettingScreen)