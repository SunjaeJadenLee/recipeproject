import React, { useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import { Ionicons, AntDesign, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import StyleSheet from 'react-native-extended-stylesheet' 
import FastImage from 'react-native-fast-image'

import { connect } from 'react-redux'
import NeumorphWrapper from './NeumorphWrapper'
import RevertNeumorphWrapper from './RevertNeumorphWrapper'
import SquareButton from './buttons/SquareButton'
const REM = Dimensions.get('window').width / 375


const NewFeedItem = (props) => {
  const { name, icon, darkModeColor, darkModeTextColor, onPress, data } = props;
  const [like, setLike] = useState(false);
  console.log(data)
  return (
    <NeumorphWrapper shadowColor={darkModeColor}>
      <View style={{ ...styles.container, backgroundColor: darkModeColor }}>
        <View style={styles.header}>
          <RevertNeumorphWrapper shadowColor={darkModeColor}>
            <Image style={{ ...styles.profileImage, backgroundColor: darkModeColor }} />
          </RevertNeumorphWrapper>
          <View style={styles.nameContainer}><Text style={styles.nameText}>{data.name}</Text></View>
          <View style={styles.icon}>
            <Entypo color={darkModeTextColor} name={'dots-three-vertical'} size={18 * REM} />
          </View>
        </View>
        {data.image_urls && <FastImage style={styles.image} source={{ uri: data.image_urls[0] }} />}
        <View style={styles.feedFooter}>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <RevertNeumorphWrapper shadowColor={darkModeColor}>
              <FontAwesome name={'spoon'} size={16 * REM} color={like ? darkModeTextColor : darkModeColor} />
            </RevertNeumorphWrapper>
          </TouchableOpacity>
          <View style={styles.likeTextContainer}>
            <Text style={{ ...styles.likeText, color: darkModeTextColor }}>3,152</Text>
          </View>
        </View>
      </View>
    </NeumorphWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginLeft: '10%',
    borderRadius: '15rem',
    height: '400rem',
    marginVertical: '10rem',
    // justifyContent:'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: '70rem',
    paddingHorizontal: '10rem',
    flexDirection: 'row',
    marginBottom:'10rem'
  },
  nameContainer:{
    marginTop:'30rem',
    marginLeft:'15rem'
  },
  nameText:{
    fontSize:'14rem',
    fontWeight:'900'
  },
  profileImage: {
    width: '50rem',
    height: '50rem',
    borderRadius: '25rem',
    marginTop: '10rem',
    marginLeft: '10rem'
  },
  icon: {
    marginLeft: 'auto',
    marginTop: '10rem'
  },
  image: {
    width: '90%',
    height: '260rem',
    borderRadius: '15rem'
  },
  feedFooter: {
    width: '100%',
    height: '60rem',
    paddingHorizontal: '20rem',
    flexDirection: 'row',
    alignItems: 'center'
  },
  likeTextContainer:{
    marginLeft:'5rem',
    marginRight:'10rem'
  },
  likeText:{
    fontWeight:'bold'
  }
});


const mapStateToProp = (state) => ({
  darkModeColor: state.darkMode.darkModeColor,
  darkModeTextColor: state.darkMode.darkModeTextColor
})

const mapDispatchToProp = (dispatch) => ({

})

export default connect(mapStateToProp, mapDispatchToProp)(NewFeedItem)