import React,{useRef,useState,useEffect} from 'react';
import { Image, Text, Animated, AsyncStorage, View, SafeAreaView,TouchableWithoutFeedback,Dimensions, FlatList } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet'

import RevertNeumorphWrapper from '../../components/RevertNeumorphWrapper'
import NeumorphWrapper from '../../components/NeumorphWrapper'  

import {connect} from 'react-redux'
import {setDarkMode} from '../../redux/actions'
import {setCategoryPage,setCategoryPageRef} from '../../redux/categoryActions' 
import { Feather } from '@expo/vector-icons';
import ToolTip,{TooltipChildrenContext} from 'react-native-walkthrough-tooltip'
import SquareButton from '../../components/buttons/SquareButton';

const REM = Dimensions.get('window').width / 375

const CategoryScreen = (props) => {
    const { navigation,darkModeColor,darkModeTextColor,darkMode,setDarkMode,
        category_type,selected_category,category_ingredient,
        category_page,setCategoryPage,setCategoryPageRef,category_pageRef, 
        secondIngCategory,thirdIngCategory
      } = props;
    const [page, setPage] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('question').then(result=>{
            console.log('instruction question:' +result)
            if(result == 'false'){
                setPage(3)
            }else {
                setPage(0)
            }
        })
    }, [])

    return (
        <TouchableWithoutFeedback onPress={()=>setPage(page+1)}>
            <View style={{...styles.container,display:page<=2?'flex':'none'}}>
                {page==0&&<>
                <View style={styles.inst1Text}>
                    <Text style={styles.text}>프로필을 수정하고</Text>
                    <Text style={styles.text}>기능을 설정하세요.</Text>
                </View>
                <View style={styles.inst1Arrow}>
                    <Feather name={'corner-right-up'} color={'#fff'} size={24*REM}/>
                </View>
                <View style={styles.inst1Image}>
                        <NeumorphWrapper shadowColor={darkModeColor}>
                                 <View style={styles.profileButton}> 
                                    <SquareButton color={darkModeColor} name={'align-center'} textColor={darkModeTextColor} />
                                </View> 
                        </NeumorphWrapper>
                </View>
                </>}
                {page==1&&<>
                <View style={styles.inst2Text}>
                    <Text style={styles.text}>내 레시피를 추가하고</Text>
                    <Text style={styles.text}>다른 사람들과 공유해보세요.</Text>
                </View>
                <View style={styles.inst2Arrow}>
                    <Feather name={'corner-right-up'} color={'#fff'} size={24*REM}/>
                </View>
                    <View style={styles.inst2Image}>
                        <NeumorphWrapper shadowColor={darkModeColor}>
                            <View style={styles.profileButton}>
                                <SquareButton color={darkModeColor} name={'th'} textColor={darkModeTextColor} />
                            </View>
                        </NeumorphWrapper>
                    </View>
                </>}
                {page==2&&<>
                <View style={styles.inst3Text}>
                    <Text style={styles.text}>다른 사람들의 레시피를 </Text>
                    <Text style={styles.text}>조건에 맞춰 검색하세요.</Text>
                </View>
                <View style={styles.inst3Arrow}>
                    <Feather name={'corner-right-down'} color={'#fff'} size={24*REM}/>
                </View>
                    <View style={styles.inst3Image}>
                        <NeumorphWrapper shadowColor={darkModeColor}>
                            <View style={styles.profileButton}>
                                <SquareButton color={darkModeColor} name={'chevron-right'} textColor={darkModeTextColor} />
                            </View>
                        </NeumorphWrapper>
                    </View>
                </>}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'rgba(0,0,0,.7)',
        zIndex:101
    },
    inst1Text:{
        position:'absolute',
        right:'70rem',
        top:'100rem'
    },
    text:{
        color:'#fff',
        fontSize:'24rem'
    },
    inst1Arrow:{
        position:'absolute',
        right:'50rem',
        top:'80rem'

    },
    inst1Image:{
        position:'absolute', 
        right:'30rem',
        top:'40rem'
    },
    inst2Text:{
        position:'absolute',
        right:'70rem',
        top:'150rem'
    },
    inst2Arrow:{
        position:'absolute',
        right:'50rem',
        top:'125rem'

    },
    inst2Image:{
        position:'absolute', 
        right:'30rem',
        top:'80rem'
    },
    inst3Text:{
        position:'absolute',
        right:'80rem',
        top:'380rem'
    },
    inst3Arrow:{
        position:'absolute',
        right:'50rem',
        top:'400rem'

    },
    inst3Image:{
        position:'absolute', 
        right:'30rem',
        top:'435rem'
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


export default connect(mapStateToProp,mapDispatchToProp)(CategoryScreen)