import { Box, ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

import SearchCard from '../components/reuse/SearchCard';

export default function SearchScreen({ navigation }) {
  return (
    <Box style={styles.container}>
      <ScrollView>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </ScrollView>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
