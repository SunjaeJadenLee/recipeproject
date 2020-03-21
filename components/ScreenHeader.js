import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RevertNeumophWrapper from './RevertNeumophWrapper'
import NeumophWrapper from './NeumophWrapper'
import SquareButton from './buttons/SquareButton'

import {connect} from 'react-redux'

const ScreenHeader = (props) => {
  const { navigation,darkModeColor,darkModeTextColor } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <RevertNeumophWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SquareButton color={darkModeColor} name={'chevron-left'} textColor={darkModeTextColor}/>
          </TouchableOpacity>
        </RevertNeumophWrapper>
        <View style={styles.headerTextContainer}><Text style={{...styles.headerText,color:darkModeTextColor}}>{props.title}</Text></View>
        <NeumophWrapper shadowColor={darkModeColor}>
          <TouchableOpacity onPress={() => navigation.navigate('setting')}>
            <SquareButton color={darkModeColor} name={'align-center'} textColor={darkModeTextColor}/>
          </TouchableOpacity>
        </NeumophWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#EAEAEA',
    paddingHorizontal: 30
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
    lineHeight: 40,
    fontSize: 20,
    fontWeight: 'bold'
  }
});


const mapStateToProp = (state) =>({
  darkModeColor: state.darkModeColor,
  darkModeTextColor:state.darkModeTextColor
})

const mapDispatchToProp = (dispatch) =>({

})

export default connect(mapStateToProp,mapDispatchToProp)(ScreenHeader)