import { Box, ScrollView } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import SearchCard from '../components/reuse/SearchCard';
import screens from '../resources/screens';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import resortApi from '../common/api/resort';
import SearchBar from '../components/reuse/SearchBar';
import { setShowSearch } from '../redux/reducer/searchReducer.js';

export default function SearchScreen() {

  const searchState = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      load();
      return;
    }, [searchState.dateRange, searchState.location, searchState.numberOfPeople])
  );

  let item = [
    {
      resort_id: '1',
      title: 'Onsen Villas Resort',
      description: 'Onsen Villas Resort – điểm đến yên bình theo phong cách Nhật Bản hòa giữa thiên nhiên vùng Hoà Bình tươi đẹp.',
      price: '3.800.000đ - 4.000.000đ',
      address: 'Thành phố Hòa Bình, Tỉnh Hòa Bình',
      image: 'https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F12de4890-b4d3-11ed-9c5f-b94700cd92b3%2F1676556753961-872309572.jpg?alt=media'
    }
  ];

  /**
   * Load dữ liệu
   */
  const load = async () => {
    resortApi.search(searchState).then(res => {
      setItems(res.data);
    });
  }

  const navigation = useNavigation();

  const pressItem = (item) => {
    navigation.navigate(screens.SCREEN.RESORT, { item: item })
  }

  return (
    <Box style={styles.container}>
      {
        searchState.showOnSearch && <SearchBar />
      }
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
