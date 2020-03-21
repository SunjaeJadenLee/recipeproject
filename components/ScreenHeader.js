import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import RevertNeumophWrapper from './RevertNeumophWrapper'
import NeumophWrapper from './NeumophWrapper'
import SquareButton from './buttons/SquareButton'

const ScreenHeader = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <RevertNeumophWrapper shadowColor={'#EAEAEA'}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SquareButton color={'#EAEAEA'} name={'chevron-left'} />
          </TouchableOpacity>
        </RevertNeumophWrapper>
        <View style={styles.headerTextContainer}><Text style={styles.headerText}>{props.title}</Text></View>
        <NeumophWrapper shadowColor={'#EAEAEA'}>
          <TouchableOpacity onPress={() => navigation.navigate('setting')}>
            <SquareButton color={'#EAEAEA'} name={'align-center'} />
          </TouchableOpacity>
        </NeumophWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAEAEA',
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


export default ScreenHeader