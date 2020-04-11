import React,{useRef,useEffect,useState} from 'react';
import { Image, Platform, Animated, TouchableOpacity, View, SafeAreaView,ScrollView,Dimensions, FlatList } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper' 
import ScreenHeader from '../../components/ScreenHeader'
import SettingListItem from '../../components/SettingListItem'
import CategoryHeader from '../../components/category/CategoryHeader'
import CategoryList from '../../components/category/CategoryList'
import CategorySearchBar from '../../components/category/CategorySearchBar'
import CategorySlider from '../../components/category/CategorySlider'

import {connect} from 'react-redux'
import {setDarkMode} from '../../redux/actions'
import {setCategoryPage,setCategoryPageRef} from '../../redux/categoryActions'

const REM = Dimensions.get('window').width / 375

const CategoryScreen = (props) => {
  const { navigation,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
    category_type,selected_category,category_ingredient,
    category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
    secondIngCategory,thirdIngCategory
  } = props;
  const flatlist = useRef(null);
  const [refs,setRefs] = useState({});
  flatlist&&setCategoryPageRef(flatlist); 
  
  const data = [
    <CategoryList data={category_ingredient} isType={true}/> ,
    <CategoryList data={secondIngCategory} isType={true}/> ,
    <CategoryList data={thirdIngCategory}/> ,
  ]

  return (
    <View style={{...styles.container,backgroundColor:darkModeColor}}> 
        <SafeAreaView />
        <ScreenHeader title={'SEARCH'} navigation={navigation} hasCategory={true}/> 
      <ScrollView>
        <CategoryList data={selected_category} selectList={true}/>
        <CategoryHeader name={'종류별'} />
        <CategorySearchBar/> 
          <CategoryList data={category_type} setRefs={setRefs} refs={refs} ingredient={false}/> 
        <CategoryHeader name={'재료별'} onPress={()=>{ 
          if(category_page!==0){
            category_pageRef.current.scrollToIndex({index:category_page-1})
            setCategoryPage(category_page-1);
          }
          }} isType={true}/>
          <FlatList 
            ref={flatlist}
            data={data} 
            initialNumToRender={category_page+1}
            initialScrollIndex={0} 
            horizontal
            renderItem={({item,index})=>{return item}}
            pagingEnabled
            showsHorizontalScrollIndicator
            scrollEnabled={false}

          />
        <CategoryHeader name={'칼로리별'} />
        <CategorySlider minVal={0} maxVal={2000}/>
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width:'100%',
    height:'100%' 
  }, 
});


const mapStateToProp = (state) =>({
  darkModeColor: state.darkMode.darkModeColor,
  darkModeTextColor:state.darkMode.darkModeTextColor,
  darkMode:state.darkMode.darkMode,
  selected_category:state.category.selected_category,
  category_type:state.category.category_type,
  category_ingredient:state.category.category_ingredient,
  secondIngCategory:state.category.secondIngCategory,
  thirdIngCategory:state.category.thirdIngCategory,
  category_page:state.category.category_page,
  category_pageRef:state.category.category_pageRef
})

const mapDispatchToProp = (dispatch) =>({
  setDarkMode: (darkMode) =>dispatch(setDarkMode(darkMode)),
  setCategoryPage: (page) => dispatch(setCategoryPage(page)),
  setCategoryPageRef: (ref) =>dispatch(setCategoryPageRef(ref))
})


export default connect(mapStateToProp,mapDispatchToProp)(CategoryScreen)