import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StyleSheet from 'react-native-extended-stylesheet'

import RevertNeumorphWrapper from './RevertNeumorphWrapper'
import NeumorphWrapper from './NeumorphWrapper'
import SquareButton from './buttons/SquareButton'

import {setCategoryPage,setCategoryPageRef,resetIngredientCategory} from '../redux/categoryActions'
import {connect} from 'react-redux'

const ScreenHeader = (props) => {
  const { title,navigation,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
    category_type,selected_category,category_ingredient,
    category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
    secondIngCategory,thirdIngCategory,hasCategory,resetIngredientCategory,
    data,postRecipe
  } = props;
  console.log(postRecipe)
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {title !== 'HOME' && <RevertNeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => {
            if(hasCategory){
              setCategoryPage(0);
              resetIngredientCategory();
            }
            navigation.goBack()
            }}>
            <SquareButton color={darkModeColor} name={'chevron-left'} textColor={darkModeTextColor} />
          </TouchableOpacity>
        </RevertNeumorphWrapper>}
        <View style={styles.headerTextContainer}><Text style={{ ...styles.headerText, color: darkModeTextColor }}>{title}</Text></View>
        {(title !== 'SETTING' &&title !== 'RECIPE'&&title !== 'DETAIL')&& <NeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => navigation.navigate('setting')}>
            <SquareButton color={darkModeColor} name={'align-center'} textColor={darkModeTextColor} />
          </TouchableOpacity>
        </NeumorphWrapper>}
        {(title =='RECIPE'&&data.tags.ing)&&<NeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('category_detail',{data:data})
            }}>
            <SquareButton color={darkModeColor} name={'chevron-right'} textColor={darkModeTextColor} />
          </TouchableOpacity>
        </NeumorphWrapper>}
        {title =='DETAIL'&&<NeumorphWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => {postRecipe()}}>
            <SquareButton color={darkModeColor} name={'send-o'} textColor={darkModeTextColor} />
          </TouchableOpacity>
        </NeumorphWrapper>}
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#EAEAEA',
    paddingHorizontal:'27rem'
  },
  headerContainer: {
    width: '100%',
    textAlignVertical: 'center',
    flexDirection: 'row',
  },
  headerTextContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  headerText: {
    lineHeight: '40rem',
    fontSize: '20rem',
    fontWeight: 'bold'
  }
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
  setCategoryPageRef: (ref) =>dispatch(setCategoryPageRef(ref)), 
  resetIngredientCategory: ()=>dispatch(resetIngredientCategory()),
})

export default connect(mapStateToProp,mapDispatchToProp)(ScreenHeader)