import { Box, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeHeader from '../components/reuse/HomeHeader';
import SearchBar from '../components/reuse/SearchBar';

export default function HomeScreen({ navigation }) {
  return (
    <Box style={styles.container}>
      <HomeHeader></HomeHeader>
      <SearchBar style={styles.searchBar} ></SearchBar>
      {/* <Image source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F12de4890-b4d3-11ed-9c5f-b94700cd92b3%2F1676556753961-872309572.jpg?alt=media"
      }} alt="Alternate Text" style={styles.cover} resizeMode="cover" /> */}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  cover: {
    height: '30%'
  },
  searchBar: {
    marginTop: 10,
    marginHorizontal: 20
  }
});
