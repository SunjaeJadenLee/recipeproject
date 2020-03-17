import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenHeader from '../components/ScreenHeader'
import NeumophWrapper from '../components/NeumophWrapper'

export default function HomeScreen(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScreenHeader title={'HOME'} navigation={navigation}/>
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}> 
        <NeumophWrapper shadowColor={'#EAEAEA'}>
          <View style={{width:150,height:150,borderRadius:75,backgroundColor:'#EAEAEA'}}></View>
        </NeumophWrapper>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
   container:{
     backgroundColor:'#EAEAEA',
     width:'100%',
     height:'100%'
   }
});

// ios: {
//   shadowColor: 'black',
//   shadowOffset: { width: 0, height: -3 },
//   shadowOpacity: 0.1,
//   shadowRadius: 3,
// },
// android: {
//   elevation: 20,
// },