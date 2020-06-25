import React,{useState,useRef, useEffect} from 'react';
import { Image, Platform, Text, Dimensions, View,SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ScrollableTabView from 'react-native-scrollable-tab-view'

import ScreenHeader from '../components/ScreenHeader'
import NeumorphWrapper from '../components/NeumorphWrapper'
import RevertNeumorphWrapper from '../components/RevertNeumorphWrapper'
import CategoryHeader from '../components/category/CategoryHeader'
import NewFeedList from '../components/NewFeedList' 
import MainTabbar from '../components/MainTabbar'

import {connect} from 'react-redux'
import {setDarkMode} from '../redux/actions'
import StyleSheet from 'react-native-extended-stylesheet'
import SquareButton from '../components/buttons/SquareButton';
import HomeInstruction from './instruction/HomeInstruction';

import {setDialogue} from '../redux/dialogueActions'


const mockData = [
  1,2,3
]

const REM = Dimensions.get('window').width / 375


const HomeScreen = (props) => {
  StyleSheet.build({
    $rem: REM
  })

  const {navigation,route,darkModeColor,darkModeTextColor,setDialogue} = props;
  const [selectedTab,setSelectedTab] = useState(0);  
  const scrollViewRef = useRef(); 
  
  useEffect(()=>{
    if(route.params && route.params.complete == true){
      navigation.navigate('profile',{complete:true})
    }
  },route.params)

  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}> 
      <SafeAreaView />
      <HomeInstruction />
      <ScreenHeader title={'HOME'} navigation={navigation} /> 
      <ScrollableTabView style={{width:'100%',height:'100%',flex:1}} 
      ref={scrollViewRef}
      renderTabBar={()=><MainTabbar scrollViewRef={scrollViewRef} selectedTab={selectedTab}/>}
      onChangeTab={(tab)=>setSelectedTab(tab.i)}
      >
        <ScrollView tabLabel='home' >
          <CategoryHeader name={'카테고리별 검색'} onPress={() => navigation.navigate('category')} />
          <CategoryHeader name={'새 피드'} />
          <NewFeedList navigation={navigation} />
        </ScrollView>
        <ScrollView>

        </ScrollView>
        <ScrollView>

        </ScrollView>
      </ScrollableTabView> 
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
     width:'375rem',
     height:'200rem',
     backgroundColor:'#EAEAEA',
     justifyContent:'center',
     alignItems:'center', 
   }, 
   profileButton:{
     marginLeft:'auto',
     marginRight:'27rem',
     marginTop:'5rem'
   }
});

const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor
})

const mapDispatchToProp = (dispatch) =>({
  setDialogue: (move,type) => dispatch(setDialogue(move,type))
})


export default connect(mapStateToProp,mapDispatchToProp)(HomeScreen)