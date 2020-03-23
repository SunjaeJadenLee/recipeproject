import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import SettingScreen from './screens/setting/SettingScreen'
import CategoryScreen from './screens/category/CategoryScreen'

import {Provider} from 'react-redux'
import store from './redux/store'

console.disableYellowBox = true;

const rootStack = createStackNavigator();
const HomeStack = createStackNavigator()
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef(); 
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const HomeStackScreen = props =>{
    return (
      <HomeStack.Navigator screenOptions={{headerShown:false}}>
        <HomeStack.Screen name="home" component={HomeScreen} />
        <HomeStack.Screen name="setting" component={SettingScreen}/>
        <HomeStack.Screen name="category" component={CategoryScreen} />
      </HomeStack.Navigator>
    )
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <rootStack.Navigator screenOptions={{ headerShown: false }}>
              <rootStack.Screen name="login" component={LoginScreen} />
              <rootStack.Screen name="home" component={HomeStackScreen} />
            </rootStack.Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
