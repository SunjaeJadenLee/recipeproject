import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenHeader from '../components/ScreenHeader'
import NeumophWrapper from '../components/NeumophWrapper'
import RevertNeumophWrapper from '../components/RevertNeumophWrapper'

import {connect} from 'react-redux'
import {setDarkMode} from '../redux/actions'

const mockData = [
  1,2,3
]

const HomeScreen = (props) => {
  const {navigation,darkModeColor,darkModeTextColor} = props;
  const renderItem = ({item,index}) =>{
    return(
      <RevertNeumophWrapper shadowColor={darkModeColor}>
            <View style={{...styles.listContainer,backgroundColor:darkModeColor}}>
              <NeumophWrapper shadowColor={darkModeColor}>
                <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: darkModeColor }}></View>
              </NeumophWrapper>
            </View>
          </RevertNeumophWrapper>
    )
  }
  
  return (
    <View style={{...styles.container,backgroundColor:darkModeColor}}>
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

const mapStateToProp = (state) =>({
    darkModeColor: state.darkModeColor,
    darkModeTextColor:state.darkModeTextColor
})

const mapDispatchToProp = (dispatch) =>({

})


export default connect(mapStateToProp,mapDispatchToProp)(HomeScreen)