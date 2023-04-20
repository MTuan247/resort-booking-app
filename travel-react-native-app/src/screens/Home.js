import { Box, Image, ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeHeader from '../components/reuse/HomeHeader';
import SearchBar from '../components/reuse/SearchBar';
import HomeSuggestion from '../components/reuse/HomeSuggestion';

export default function HomeScreen({ navigation }) {
  return (
    <Box style={styles.container}>
      <ScrollView>
        <HomeHeader></HomeHeader>
        <SearchBar style={styles.searchBar} ></SearchBar>
        <HomeSuggestion></HomeSuggestion>
        {/* <Image source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F12de4890-b4d3-11ed-9c5f-b94700cd92b3%2F1676556753961-872309572.jpg?alt=media"
      }} alt="Alternate Text" style={styles.cover} resizeMode="cover" /> */}
      </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  cover: {
    height: '30%'
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20
  }
});
