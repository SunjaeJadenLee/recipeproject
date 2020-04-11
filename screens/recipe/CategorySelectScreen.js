import React, { useRef, useEffect, useState } from 'react';
import { Image, Platform, Animated, TouchableOpacity, View, SafeAreaView, ScrollView, Dimensions, FlatList, Imgae } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'
import { getCameraPermissionsAsync, getCameraRollPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper'
import ScreenHeader from '../../components/ScreenHeader'

import { connect } from 'react-redux'
import { setDarkMode } from '../../redux/actions'
import { setCategoryPage, setCategoryPageRef } from '../../redux/categoryActions'


import RecipeBox from '../../components/RecipeBox'
import SquareButton from '../../components/buttons/SquareButton';
import CategoryList from '../../components/category/CategoryList';
import CategorySearchBar from '../../components/category/CategorySearchBar';
import CategoryHeader from '../../components/category/CategoryHeader';
import { FontAwesome } from '@expo/vector-icons';

const REM = Dimensions.get('window').width / 375

const data = [1, 2, 3, 4, 5]

const CategorySelectScreen = (props) => {
  const [ing, setIng] = useState([]);
  const [type, setType] = useState([]);
  const { navigation, darkModeColor, darkModeTextColor, darkMode, setDarkMode,
    category_type, selected_category, category_ingredient,
    category_page, setCategoryPage, setCategoryPageRef, category_pageRef,
    secondIngCategory, thirdIngCategory
  } = props;
  const cflatlist = useRef(null);
  const [refs, setRefs] = useState({});
  cflatlist && setCategoryPageRef(cflatlist);
  console.log('ing: ' + ing);
  console.log('type: ' + type);
  const data = [
    <CategoryList data={category_ingredient} isType={true} isAdd={true} cflatlist />,
    <CategoryList data={secondIngCategory} isType={true} isAdd={true} cflatlist />,
    <CategoryList data={thirdIngCategory} isAdd={true} setIng={setIng} ing={ing} />,
  ]

  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
      <SafeAreaView />
      <ScreenHeader title={'CATEGORY'} navigation={navigation} hasCategory={true}/>
      <View>
        <CategorySearchBar />
        <CategoryList data={category_type} isAdd={true} setType={setType} type={type} />
      </View>
      <View>
        <CategoryHeader name={'재료별'} onPress={() => {
          if (category_page !== 0) {
            category_pageRef.current.scrollToIndex({ index: category_page - 1 })
            setCategoryPage(category_page - 1);
          }
        }} isType={true} />
        <FlatList
          ref={cflatlist}
          data={data}
          initialNumToRender={category_page + 1}
          initialScrollIndex={0}
          horizontal
          renderItem={({ item, index }) => { return item }}
          pagingEnabled
          showsHorizontalScrollIndicator
          scrollEnabled={false}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 50 * REM, alignSelf: 'center' }}>
        <NeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('recipe',{type:type,ing:ing});
            setCategoryPage(0);
            }}>
            <View style={{ ...styles.completeButton, backgroundColor: darkModeColor }}>
              <View style={styles.completeButtonInside}>
                <FontAwesome color={darkModeColor} name={'check'} size={30*REM}/>
              </View>
            </View>
          </TouchableOpacity>
        </NeumorphWrapper>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  imageItem: {
    width: '355rem',
    height: '250rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  completeButton: {
    width: '70rem',
    height: '70rem',
    borderRadius: '35rem', 
    justifyContent:'center',
    alignItems:'center',
  },
  completeButtonInside:{
    backgroundColor:'rgb(60,95,96)',
    width: '60rem',
    height: '60rem',
    borderRadius: '30rem', 
    justifyContent:'center',
    alignItems:'center',
  }
});


const mapStateToProp = (state) => ({
  darkModeColor: state.darkMode.darkModeColor,
  darkModeTextColor: state.darkMode.darkModeTextColor,
  darkMode: state.darkMode.darkMode,
  selected_category: state.category.selected_category,
  category_type: state.category.category_type,
  category_ingredient: state.category.category_ingredient,
  secondIngCategory: state.category.secondIngCategory,
  thirdIngCategory: state.category.thirdIngCategory,
  category_page: state.category.category_page,
  category_pageRef: state.category.category_pageRef
})

const mapDispatchToProp = (dispatch) => ({
  setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  setCategoryPage: (page) => dispatch(setCategoryPage(page)),
  setCategoryPageRef: (ref) => dispatch(setCategoryPageRef(ref))
})


export default connect(mapStateToProp, mapDispatchToProp)(CategorySelectScreen)