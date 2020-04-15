import * as React from 'react';
import { Image, Platform, Text, Dimensions, View,SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenHeader from '../components/ScreenHeader'
import NeumorphWrapper from '../components/NeumorphWrapper'
import RevertNeumorphWrapper from '../components/RevertNeumorphWrapper'
import CategoryHeader from '../components/category/CategoryHeader'
import NewFeedList from '../components/NewFeedList' 

import {connect} from 'react-redux'
import {setDarkMode} from '../redux/actions'
import StyleSheet from 'react-native-extended-stylesheet'
import SquareButton from '../components/buttons/SquareButton';
import HomeInstruction from './instruction/HomeInstruction';


const mockData = [
  1,2,3
]

const REM = Dimensions.get('window').width / 375


const HomeScreen = (props) => {
  StyleSheet.build({
    $rem: REM
  })

  const {navigation,darkModeColor,darkModeTextColor} = props;
  const renderItem = ({item,index}) =>{
    return(
      <RevertNeumorphWrapper shadowColor={darkModeColor}>
        <View style={{ ...styles.listContainer, backgroundColor: darkModeColor }}>
          <NeumorphWrapper shadowColor={darkModeColor}>
            <View style={{ width: 180*REM, height: 180*REM, borderRadius: 90*REM, backgroundColor: darkModeColor }}></View>
          </NeumorphWrapper>
        </View>
      </RevertNeumorphWrapper>
    )
  }
  
  return (
    <View style={{...styles.container,backgroundColor:darkModeColor}}>
      <SafeAreaView />
      <HomeInstruction />
      <ScreenHeader title={'HOME'} navigation={navigation} />
      <View style={{width:'100%'}}>
        <NeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <View style={styles.profileButton}>
              <SquareButton color={darkModeColor} name={'th'} textColor={darkModeTextColor} />
            </View>
          </TouchableOpacity>
        </NeumorphWrapper>
      </View> 
      {/* <CategoryHeader name={'추천 리스트'}/>  */}
      {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center',marginVertical:20*REM }}>
        <FlatList 
        data={mockData}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        />
      </View> */}
      <CategoryHeader name={'카테고리별 검색'} onPress={()=>navigation.navigate('category')}/>
      <CategoryHeader name={'새 피드'} />
      <NewFeedList navigation={navigation}/>
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

})


export default connect(mapStateToProp,mapDispatchToProp)(HomeScreen)