import React,{useEffect,useState} from 'react';
import { Image, Platform, Text, TouchableOpacity, View,FlatList, Dimensions } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import NeumorphWrapper from './NeumorphWrapper'
import SquareButton from './buttons/SquareButton'
import NewFeedItem from './NewFeedItem'

const REM = Dimensions.get('window').width / 375


const NewFeedList = (props) => {
  const [feeds,setFeeds] = useState([]);

  useEffect(()=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    let body = {
      page:1
    }
    fetch('http://localhost:5000/getAllRecipes', {
      method:'POST',
      headers: headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log(res)
      if(res.status == 200){
        res.json().then(resJson => {
          console.log(resJson);
          setFeeds(resJson); 
        })
      } else{
        return false
      }
      
  })
  },[])

  const {name,icon,darkModeColor,darkModeTextColor,onPress} = props;
    return (
        <View style={styles.container}>
            <FlatList  
            style={{flex:1,height:'100%'}}
            data={feeds} 
            contentContainerStyle={{justifyContent:'center'}}
            renderItem={(item,index)=><NewFeedItem data={item.item}/>}
            />
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { 
        width:'100%',
        height:'100%', 
        flex:1
    }, 
  });
  
  
  const mapStateToProp = (state) =>({
    darkModeColor: state.darkMode.darkModeColor,
    darkModeTextColor:state.darkMode.darkModeTextColor
  })
  
  const mapDispatchToProp = (dispatch) =>({
  
  })
  
  export default connect(mapStateToProp,mapDispatchToProp)(NewFeedList)