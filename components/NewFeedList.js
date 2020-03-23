import * as React from 'react';
import { Image, Platform, Text, TouchableOpacity, View,FlatList, Dimensions } from 'react-native';
import {Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet'

import {connect} from 'react-redux'
import NeumophWrapper from './NeumophWrapper'
import SquareButton from './buttons/SquareButton'
import NewFeedItem from './NewFeedItem'

const REM = Dimensions.get('window').width / 375

const mockData = [1,2,3,4,5,6,7,8,9,10]

const NewFeedList = (props) => {
  const {name,icon,darkModeColor,darkModeTextColor,onPress} = props;
    return (
        <View style={styles.container}>
            <FlatList  
            style={{flex:1,height:'100%'}}
            data={mockData} 
            contentContainerStyle={{justifyContent:'center'}}
            renderItem={(item,index)=><NewFeedItem data={item}/>}
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