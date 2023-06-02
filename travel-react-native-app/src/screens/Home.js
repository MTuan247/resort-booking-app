import { Box, ScrollView } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, Platform, NativeModules  } from 'react-native';
import HomeHeader from '../components/reuse/HomeHeader';
import SearchBar from '../components/reuse/SearchBar';
import HomeSuggestion from '../components/reuse/HomeSuggestion';
const { StatusBarManager } = NativeModules;

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
     }}>
      <Box style={styles.container}>
        <ScrollView>
          <HomeHeader></HomeHeader>
          <SearchBar style={styles.searchBar} ></SearchBar>
          <HomeSuggestion></HomeSuggestion>
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  cover: {
    height: '30%'
  },
  searchBar: {
  }
});
