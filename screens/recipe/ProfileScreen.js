import React, { useRef, useEffect, useState } from 'react';
import { Image, Platform, Animated, TouchableOpacity, View, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper'
import ScreenHeader from '../../components/ScreenHeader'

import { connect } from 'react-redux'
import { setDarkMode } from '../../redux/actions'
import { setCategoryPage, setCategoryPageRef } from '../../redux/categoryActions'
import { getMyRecipe } from '../../redux/recipeActions'

import RecipeBox from '../../components/RecipeBox'

const REM = Dimensions.get('window').width / 375
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const ProfileScreen = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { navigation, darkModeColor, darkModeTextColor, darkMode, setDarkMode,
    category_type, selected_category, category_ingredient,
    category_page, setCategoryPage, setCategoryPageRef, category_pageRef,
    secondIngCategory, thirdIngCategory, getMyRecipe, userinfo
  } = props;

  useEffect(() => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      userid: userinfo.id
    }
    fetch('http://localhost:5000/getRecipes', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log(res)
      if (res.status == 200) {
        res.json().then(resJson => {
          console.log(resJson);
          setRecipes([...resJson, 'footer']);
        })
      } else {
        return false
      }

    })
  }, [])

  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
      <SafeAreaView />
      <ScreenHeader title={'PROFILE'} navigation={navigation} />
      <ScrollView>
        <FlatList
          style={{ position: 'absolute' }}
          numColumns={3}
          key={data}
          contentContainerStyle={{ width: 375 * REM, paddingHorizontal: 10 * REM, flex: 1 }}
          data={data}
          renderItem={({ item, index }) => <RecipeBox navigation={navigation} index={index} length={data.length} />}
        />
        <FlatList
          style={{ position: 'absolute' }}
          numColumns={3}
          key={recipes}
          contentContainerStyle={{ width: 375 * REM, paddingHorizontal: 10 * REM, flex: 1 }}
          data={recipes}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => navigation.navigate('recipe_detail', { data: item })}>
              <RecipeBox navigation={navigation} index={index} length={data.length} item={item} />
            </TouchableOpacity>
          }
        />


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
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
  userinfo: state.auth.userinfo
})

const mapDispatchToProp = (dispatch) => ({
  setDarkMode: (darkMode) => dispatch(setDarkMode(darkMode)),
  setCategoryPage: (page) => dispatch(setCategoryPage(page)),
  setCategoryPageRef: (ref) => dispatch(setCategoryPageRef(ref)),
  getMyRecipe: (userid) => dispatch(getMyRecipe(userid))
})


export default connect(mapStateToProp, mapDispatchToProp)(ProfileScreen)