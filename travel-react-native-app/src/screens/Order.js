import { Box, ScrollView } from 'native-base';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import SearchCard from '../components/reuse/SearchCard';
import screens from '../resources/screens';
import { useFocusEffect } from '@react-navigation/native';
import resortApi from '../common/api/resort';

export default function OrderScreen({ navigation }) {

  const [items, setItems] = useState([]);

  /**
   * Load dữ liệu
   */
  const load = async () => {
    setItems([]);
    resortApi.order().then(res => {
      setItems(res.data);
    });
  }

  useFocusEffect(
    useCallback(() => {
      load();
      return;
    }, [])
  );

  const pressItem = (item) => {
    navigation.navigate(screens.SCREEN.RESORT, { item: item })
  }

  return (
    <Box style={styles.container}>
      <ScrollView>
        {
          items.map(item => {
            return (
              <SearchCard key={item.resort_id} {...item} onPress={() => pressItem(item)} />
            )
          })
        }
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
