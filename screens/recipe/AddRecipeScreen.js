import React,{useRef,useEffect, useState} from 'react'; 
import { Image, Platform, Animated, TouchableOpacity, View, SafeAreaView,ScrollView,Dimensions, FlatList,Imgae,Text, TextInput } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'
import {getCameraPermissionsAsync,getCameraRollPermissionsAsync,launchImageLibraryAsync} from 'expo-image-picker'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper' 
import ScreenHeader from '../../components/ScreenHeader' 

import {connect} from 'react-redux'
import {setDarkMode} from '../../redux/actions'
import {setCategoryPage,setCategoryPageRef} from '../../redux/categoryActions'


import RecipeBox from '../../components/RecipeBox'
import SquareButton from '../../components/buttons/SquareButton';
import CategoryHeader from '../../components/category/CategoryHeader';
import AddInstruction from '../instruction/AddInstruction';

const REM = Dimensions.get('window').width / 375 

const data = [1,2,3,4,5]

const RecipeAddScreen = (props) => {
  const [name, setName] = useState('');
  const [imageUrls,setImageUrls] = useState([]);
  const [descs,setDescs] = useState([]);
  const [tags,setTages] = useState([]);
  const imageList = useRef();
  const descList = useRef(); 

  const { navigation,route,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
    category_type,selected_category,category_ingredient,
    category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
    secondIngCategory,thirdIngCategory,ing,type
  } = props;

  useEffect(() => {
    route.params&&console.log(route.params.data)
    route.params&&setTages({ing:route.params.ing,type:route.params.type})
  }, [route.params])

  const renderItem = ({item,index}) =>{
    return(
    <NeumorphWrapper shadowColor={darkModeColor}>
      <View style={{...styles.imageItem,backgroundColor:darkModeColor}}> 
        <Image style={styles.image} source={{uri:item.uri}}/>
      </View>
    </NeumorphWrapper>
    )
  }

  const descRenderItem = ({item,index}) =>{
    return(
      <View style={{width:375*REM,justifyContent:'center',alignItems:'center'}}>
        <RevertNeumorphWrapper shadowColor={darkModeColor}>
          <View style={{ ...styles.descItem, backgroundColor: darkModeColor }}>
            <TextInput onChangeText={(e)=>{
              let desc = descs;
              desc[index] = e
              setDescs(desc);
            }} style={{ ...styles.descInput, backgroundColor: darkModeColor }} numberOfLines={6} />
          </View>
        </RevertNeumorphWrapper>
      </View> 
    )
  }

  const addImage = () =>{
    getCameraRollPermissionsAsync().then(e=>{
      launchImageLibraryAsync({allowsMultipleSelection:true}).then(image=>{
        
        if(!image.cancelled){
          let images = imageUrls.concat(image);
          setImageUrls(images)  
          setDescs([...descs,''])
          
        } 
      })
    })
  }

  return (
    <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
      <AddInstruction />
      <SafeAreaView />
      <ScreenHeader title={'RECIPE'} navigation={navigation} data={{
        tags:tags,
        name:name,
        images:imageUrls,
        descriptions:descs
      }} />
      <ScrollView>
        <FlatList
          onMomentumScrollEnd={(e)=>{
            console.log(e.nativeEvent.contentOffset.x/414)
          }}
          ref={imageList}
          contentContainerStyle={{ paddingVertical: 20 * REM }}
          data={imageUrls}
          renderItem={renderItem}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() =>
            <NeumorphWrapper shadowColor={darkModeColor}>
              <View style={{ ...styles.imageItem, backgroundColor: darkModeColor }}>
                <NeumorphWrapper shadowColor={darkModeColor}>
                  <TouchableOpacity onPress={() => addImage()}>
                    <SquareButton color={darkModeColor} name={'plus'} textColor={darkModeTextColor} />
                  </TouchableOpacity>
                  {imageUrls.length == 0 && <View style={{ alignItems: 'center', marginTop: 5 * REM }}><Text style={{color:darkModeTextColor}}>이미지를</Text><Text style={{color:darkModeTextColor}}>추가하세요</Text></View>}
                </NeumorphWrapper>
              </View>
            </NeumorphWrapper>}
        />
      <View style={styles.titleContainer}>
        <TextInput style={{...styles.titleInput,color:darkModeTextColor}} onChangeText={(e)=>setName(e)} 
          placeholder={'제목을 입력하세요.'}
        />
      </View>
      <CategoryHeader name={'태그 하기'} onPress={()=>navigation.navigate('select')}/> 
      <View style={{width:'100%',padding:20*REM}}>
      {(tags.ing&&tags.ing.length!=0)&&<Text>재료:   {tags.ing.map(e=>e+',  ')}</Text>}
      {(tags.type&&tags.type.length!=0)&&<Text>종류:   {tags.type}</Text>}
      </View> 
      <CategoryHeader name={'설명'} />  
      <View style={{width:375*REM,justifyContent:'center',alignItems:'center'}}>
          {imageUrls.length!==0?<FlatList  
          ref={descList}
          data={descs}
          pagingEnabled
          renderItem={descRenderItem}
          showsHorizontalScrollIndicator={false}
          horizontal 
          />:<Text style={{marginTop:20*REM,color:darkModeTextColor}}>이미지를 먼저 추가하세요.</Text>}
      </View>
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width:'100%',
    height:'100%' 
  },  
  imageItem: {
    width:'375rem',
    height:'250rem',
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width:'375rem',
    height:'250rem'
  },
  descItem:{ 
    marginTop:'15rem',
    marginHorizontal:'10rem',
    backgroundColor:'#ccc'
  },
  descInput:{
    width:'335rem',
    height:'220rem',
    // marginHorizontal:'10rem'
  },
  titleContainer:{
    marginLeft:'20rem',
    marginVertical:'10rem'
  },
  titleInput:{
    fontSize:'20rem',
    fontWeight:'500'
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
  setCategoryPageRef: (ref) =>dispatch(setCategoryPageRef(ref))
})


export default connect(mapStateToProp,mapDispatchToProp)(RecipeAddScreen)