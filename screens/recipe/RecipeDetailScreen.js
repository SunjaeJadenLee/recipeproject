import React,{useRef,useEffect,useState} from 'react';
import { Image, Platform, Animated, TouchableOpacity, View, SafeAreaView,ScrollView,Dimensions, FlatList,Text, TouchableWithoutFeedback } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet' 
import FastImage from 'react-native-fast-image'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper' 
import ScreenHeader from '../../components/ScreenHeader' 

import {connect} from 'react-redux'
import {setDarkMode} from '../../redux/actions'
import {setCategoryPage,setCategoryPageRef} from '../../redux/categoryActions'
import {getMyRecipe} from '../../redux/recipeActions'
import { FontAwesome } from '@expo/vector-icons';


const REM = Dimensions.get('window').width / 375 

const RecipeDetailScreen = (props) => {
  const [recipe,setRecipe] = useState(null);
  const [ingOpen,setIngOpen] = useState(false);
  const [ingAnimated,setIngAnimated] = useState(new Animated.Value(0));
  const ingInterp = ingAnimated.interpolate({
    inputRange:[0,1],
    outputRange:[0,100*REM]
  })
  const { navigation,route,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
    category_type,selected_category,category_ingredient,
    category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
    secondIngCategory,thirdIngCategory,getMyRecipe
  } = props; 
  const {data} = route.params;
  console.log(data)
  const renderItem = ({item,index}) =>{
    return(
      <NeumorphWrapper shadowColor={darkModeColor}>
        <View style={{backgroundColor:darkModeColor,width:290*REM,height:300*REM,marginHorizontal:11*REM,borderRadius:15*REM,justifyContent:'center',alignItems:'center'}}>
          <FastImage style={{...styles.recipeImage}} source={{uri:item}} />
        </View>
      </NeumorphWrapper>
    )
  }

  const renderIngItem = ({item,index}) =>{
    return(
      <View style={{height:20*REM,marginLeft:20*REM,marginTop:10*REM}}>
        <Text>{index+1}. {item}: {data.ingredients[item]} g</Text>
      </View>
    )
  }

  const renderDescItem = ({item,index}) =>{
    return(
      <View style={{height:200*REM,width:315*REM,padding:10*REM}}>
        <Text>{item}</Text>
      </View>
    )
  }

  const ingToggle = () =>{ 
    setIngOpen(!ingOpen);

    Animated.timing(ingAnimated,{
      toValue:ingOpen?0:1,
      duration:300,
      // useNativeDriver:true
    }).start();
  }
  console.log(data)
  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
      <SafeAreaView />
      <ScreenHeader title={'FEED'} navigation={navigation} />
      <View style={styles.feedContentContainer}>
        <View style={styles.feedHeaderContainer}>
          <FastImage style={styles.feedHeaderProfileImage} source={{ uri: data.user.profileUrl }} />
          <View style={styles.feedHeaderTitle}><Text style={styles.feedHeaderTitleText}>{data.name}</Text></View>
        </View>
        <FlatList
          data={data.image_urls}
          renderItem={renderItem}
          horizontal
          style={styles.imagesContainer}
          contentContainerStyle={styles.imagesContentContainer}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={styles.categoryContainer}>
          <TouchableWithoutFeedback onPress={() => ingToggle()}>
            <View style={styles.categoryHeaderContainer}>
              <Text style={styles.categoryHeaderContainerText}>재료: {Object.keys(data.ingredients).map(e => e + ', ')}</Text>

              <View style={{ marginLeft: 'auto', marginRight: 20 * REM }}>
                <FontAwesome style={{ lineHeight: 40 * REM }} name={'sort-down'} />
              </View>

            </View>
          </TouchableWithoutFeedback>
          <RevertNeumorphWrapper shadowColor={darkModeColor}>
            <Animated.FlatList style={{
              ...styles.ingredientContainer, backgroundColor: darkModeColor,
              height: ingInterp, width: 315 * REM
            }}
              data={Object.keys(data.ingredients)}
              renderItem={renderIngItem}
            />
          </RevertNeumorphWrapper>
          <View style={styles.detailContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailBoxHeaderText}>소요시간</Text>
              <Text style={styles.detailBoxText}>{data.time} mins</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailBoxHeaderText}>칼로리</Text>
              <Text style={styles.detailBoxText}>{data.calorie} kcal</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailBoxHeaderText}>예상금액</Text>
              <Text style={styles.detailBoxText}>{data.price} 원</Text>
            </View>
          </View>
        </View>
        <FlatList 
        style={styles.descriptionContainer}
        contentContainerStyle={styles.descriptionContentContainer}
        data={data.descriptions}
        horizontal
        pagingEnabled
        renderItem={renderDescItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width:'100%',
    height:'100%' 
  },  
  feedContentContainer:{
    width:'100%',
    paddingHorizontal:'30rem'
  },
  feedHeaderContainer:{
    flexDirection:'row',
    height:'60rem',
    alignItems:'center',
    marginTop:'10rem'
  },
  feedHeaderProfileImage:{
    width:'40rem',
    height:'40rem',
    borderRadius:'20rem'
  },
  imagesContainer:{
    height:'330rem'
  },
  imagesContentContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  recipeImage:{
    width:'280rem',
    height:'290rem',
    borderRadius:'15rem', 
  },
  categoryHeaderContainer:{
    height:'40rem',  
    width:'315rem',
    marginLeft:'10rem',
    flexDirection:'row'
  },
  categoryHeaderContainerText:{
    lineHeight:'40rem'
  },
  categoryContainer:{

  },
  ingredientContainer:{
    
  },
  feedHeaderTitle:{
    marginLeft:'10rem'
  },
  feedHeaderTitleText:{
    fontSize:'14rem',
    fontWeight:'700'
  },
  detailContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:'30rem',
    marginTop:'10rem'
  },
  detailBox:{
    marginTop:'10rem',
    textAlign:'center'
  },
  detailBoxHeaderText:{
    fontSize:'16rem',
    fontWeight:'900',
    textAlign:'center'
  },
  detailBoxText:{
    marginTop:'5rem',
    textAlign:'center'
  },
  descriptionContainer:{
    width:'315rem',
    marginTop:'10rem'
  },
  descriptionContentContainer:{

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
  getMyRecipe: (userid) =>dispatch(getMyRecipe(userid))
})


export default connect(mapStateToProp,mapDispatchToProp)(RecipeDetailScreen)