import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenHeader from '../components/ScreenHeader'
import NeumophWrapper from '../components/NeumophWrapper'
import RevertNeumophWrapper from '../components/RevertNeumophWrapper'



const mockData = [
  1,2,3
]

const renderItem = ({item,index}) =>{
  return(
    <RevertNeumophWrapper shadowColor={'#EAEAEA'}>
          <View style={styles.listContainer}>
            <NeumophWrapper shadowColor={'#EAEAEA'}>
              <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#EAEAEA' }}></View>
            </NeumophWrapper>
          </View>
        </RevertNeumophWrapper>
  )
}

export default function HomeScreen(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScreenHeader title={'HOME'} navigation={navigation} />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <FlatList 
        data={mockData}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        />
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
   },
   listContainer:{
     width:415,
     height:250,
     backgroundColor:'#EAEAEA',
     justifyContent:'center',
     alignItems:'center', 
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