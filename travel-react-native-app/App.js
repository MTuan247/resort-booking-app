import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import './src/resources/theme'
import Navigation from './src/navigation'
import { navigationTheme, nativeBaseTheme } from './src/resources/theme';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
export default function App() {

  /**
   * Load font chữ
   */
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  /**
   * Sau khi load xong thì hide splash screen
   */
  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={navigationTheme}>
        <NativeBaseProvider theme={nativeBaseTheme}>
          <Navigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});
