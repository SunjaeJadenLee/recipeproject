import React, { useRef, useEffect, useState } from 'react';
import { Image, Platform, Animated, KeyboardAvoidingView, View, SafeAreaView, ScrollView, Dimensions, Text, Imgae, FlatList, TextInput } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'
import { getCameraPermissionsAsync, getCameraRollPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker'
import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper'
import ScreenHeader from '../../components/ScreenHeader'

import { connect } from 'react-redux'
import { setDarkMode } from '../../redux/actions'
import { setCategoryPage, setCategoryPageRef } from '../../redux/categoryActions'
import {postRecipe} from '../../redux/recipeActions'

import CategoryOption from '../../components/category/CategoryOption';
import CategoryDetailItem from '../../components/category/CategoryDetailItem'

import {CommonActions} from '@react-navigation/native'

const REM = Dimensions.get('window').width / 375

const CategoryDetailScreen = (props) => {
  const { navigation, route, darkModeColor, darkModeTextColor, darkMode, setDarkMode,
    category_type, selected_category, category_ingredient,
    category_page, setCategoryPage, setCategoryPageRef, category_pageRef,
    secondIngCategory, thirdIngCategory,userinfo
  } = props;

  const [ing, setIng] = useState([]);
  const [grams, setGrams] = useState([]);
  const [calories, setCalories] = useState(0);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0); 

  useEffect(() => {
    console.log('detail@@@@@@@@@@@@@@@@@@@@@')
    route.params&& console.log(route.params.data)
    route.params && setIng(route.params.data.tags.ing)
  }, [route.params])

  const [ingAmtOpen, setIngAmtOpen] = useState(false);
  const [ingAmtAnime, setIngAmtAnime] = useState(new Animated.Value(0));
  const [calOpen, setCalOpen] = useState(false);
  const [calAnime, setCalAnime] = useState(new Animated.Value(0));
  const [priceOpen, setPriceOpen] = useState(false);
  const [priceAnime, setPriceAnime] = useState(new Animated.Value(0));
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeAnime, setTimeAnime] = useState(new Animated.Value(0));
  //   const ingAmtInappro = ingAmtAnime.interpolate({inputRange:[0,1],outputRange:[0,2]})

  const setOpen = (open, setopen, openanime, height) => {
    Animated.timing(openanime, {
      toValue: open ? 0 : height * REM,
      duration: 300, 
    }).start()
    setopen(!open);

  } 

  useEffect(() => {
    console.log(grams)
  }, [grams])

  const renderItem = ({ item, index }) => {
    return (
      <CategoryDetailItem name={item} setGrams={setGrams} index={index} grams={grams} />
    )
  }
  
  const postRecipe = () => { 
    let { data } = route.params;
    let imageArray = data.images.map(e=>{return{uri: e.uri,name: e.uri,filename :e.uri.split('/')[e.uri.split('/').length-1],type: 'image/png'}})
    console.log(imageArray)
    let headers = new Headers();
    let formData = new FormData();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')
    formData.append('name', data.name);
    formData.append('type', JSON.stringify(data.tags.type));
    formData.append('ingredients',JSON.stringify(grams)); 
    data.images.map(e=>formData.append('images',{uri: e.uri,name: e.uri,filename :e.uri.split('/')[e.uri.split('/').length-1],type: 'image/png'}))
    formData.append('descriptions', JSON.stringify(data.descriptions));
    formData.append('calorie',calories);
    formData.append('price',price);
    formData.append('time',time);
    formData.append('user',JSON.stringify(userinfo.user));
    console.log(userinfo)
    

    fetch('http://localhost:5000/recipe', {
      method:'POST',
      headers: headers,
      body: formData
    }).then(res => {
      console.log(res)
      if(res.status == 200){
        res.json().then(resJson => {
          console.log(resJson)
          navigation.dispatch(
            CommonActions.reset({
              index:1,
              routes:[{name:'profile'}]
            })
          )
        })
      } else{
        return false
      }
      
  })
  }

  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
      <SafeAreaView />
      <ScreenHeader title={'DETAIL'} navigation={navigation} postRecipe={postRecipe} />
      {/* <KeyboardAvoidingView enabled behavior={'padding'}> */}
        <ScrollView keyboardShouldPersistTaps={'always'} >
          <View style={styles.optionContainer}>
            <CategoryOption text={'재료정량'} open={ingAmtOpen} setOpen={() => setOpen(ingAmtOpen, setIngAmtOpen, ingAmtAnime, 200)} />
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
              <Animated.View style={{ ...styles.animatedContainer, backgroundColor: darkModeColor, height: ingAmtAnime }}>
                {/* {ing.map(e => <Text>{e}</Text>)} */}
                <FlatList
                  data={ing}
                  renderItem={renderItem}
                />
              </Animated.View>
            </RevertNeumorphWrapper>
            <CategoryOption text={'칼로리'} open={calOpen} setOpen={() => setOpen(calOpen, setCalOpen, calAnime, 70)} />
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
              <Animated.View style={{ ...styles.animatedContainer, backgroundColor: darkModeColor, height: calAnime }}>
                {/* <RevertNeumorphWrapper shadowColor={darkModeColor}> */}
                <TextInput textContentType="telephoneNumber" onChangeText={(e) => setCalories(e)} style={{ ...styles.gramInput , display: calOpen ? 'flex' : 'none' }} />
                {/* </RevertNeumorphWrapper> */}
                <Text style={{ ...styles.detailText, display: calOpen ? 'flex' : 'none' }}> Kcal</Text>
              </Animated.View>
            </RevertNeumorphWrapper>
            <CategoryOption text={'예상가격'} open={priceOpen} setOpen={() => setOpen(priceOpen, setPriceOpen, priceAnime, 70)} />
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
              <Animated.View style={{ ...styles.animatedContainer, backgroundColor: darkModeColor, height: priceAnime }}>
                {/* <RevertNeumorphWrapper shadowColor={darkModeColor}> */}
                <TextInput textContentType="telephoneNumber" onChangeText={(e) => setPrice(e)} style={{ ...styles.gramInput, display: priceOpen ? 'flex' : 'none' }} />
                {/* </RevertNeumorphWrapper> */}
                <Text style={{ ...styles.detailText, display: priceOpen ? 'flex' : 'none' }}> ₩</Text>
              </Animated.View>
            </RevertNeumorphWrapper>
            <CategoryOption text={'조리시간'} open={timeOpen} setOpen={() => setOpen(timeOpen, setTimeOpen, timeAnime, 70)} />
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
              <Animated.View style={{ ...styles.animatedContainer, backgroundColor: darkModeColor, height: timeAnime }}>
                {/* <RevertNeumorphWrapper shadowColor={darkModeColor}> */}
                <TextInput textContentType="telephoneNumber" onChangeText={(e) => setTime(e)} style={{ ...styles.gramInput , display: timeOpen ? 'flex' : 'none' }} />
                {/* </RevertNeumorphWrapper> */}
                <Text style={{ ...styles.detailText, display: timeOpen ? 'flex' : 'none' }}> (분)</Text>
              </Animated.View>
            </RevertNeumorphWrapper>
          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  optionContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '10rem'
  },
  animatedContainer: {
    width: '300rem',
    marginVertical: '20rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailText: {
    fontSize: '16rem',
    fontWeight: '900'
  },
  gramInput: {
    width: '100rem',
    height: '30rem',
    borderRadius: '5rem'
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
  category_pageRef: state.category.category_pageRef,
  userinfo:state.auth.userinfo
})

const mapDispatchToProp = (dispatch) => ({
  setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  setCategoryPage: (page) => dispatch(setCategoryPage(page)),
  setCategoryPageRef: (ref) => dispatch(setCategoryPageRef(ref)), 
})


export default connect(mapStateToProp, mapDispatchToProp)(CategoryDetailScreen)