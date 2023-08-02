import { Box, FlatList, ScrollView, Skeleton, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import SearchCard from '../components/reuse/SearchCard';
import screens from '../resources/screens';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import resortApi from '../common/api/resort';
import SearchBar from '../components/reuse/SearchBar';
import { setShowSearch } from '../redux/reducer/searchReducer.js';
import NoData from '../components/reuse/NoData';

export default function SearchScreen() {

  const searchState = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noItem, setNoItem] = useState(false);

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
    if (loading || noItem) {
      return;
    }
    setLoading(true);
    resortApi.search({...searchState, limit, offset}).then(res => {
      let data = [...items, ...res.data];
      setItems(data);
      setOffset(data.length);
      setLoading(false);
      if (res.data?.length == 0) {
        setNoItem(true);
      }
    });
  }

  const navigation = useNavigation();

  const pressItem = (item) => {
    navigation.navigate(screens.SCREEN.RESORT, { item: item })
  }

  /**
   * Render item comment skeleton
   */
  const renderSkeleton = () => {
    if (loading) {
      return (
        <VStack>
          <Skeleton padding={4} h={16} rounded={'md'} />
          <Skeleton.Text padding={4} rounded={'md'} />
        </VStack>
      )
    }

    return (
      <></>
    )

  }

  /**
   * Render data
   */
  const renderData = useCallback(({ item }) => {
    return (
      <SearchCard {...item} onPress={() => pressItem(item)} />
    )
  }, []);

  return (
    <Box style={styles.container}>
      {
        searchState.showOnSearch && <SearchBar />
      }
      {/* <ScrollView>
        {
          items.map(item => {
            return (
              <SearchCard key={item.resort_id} {...item} onPress={() => pressItem(item)} />
            )
          })
        }
      </ScrollView> */}
      <VStack flex={1}>
        <FlatList 
          data={items}
          extraData={items}
          keyExtractor={item => item.resort_id}
          renderItem={renderData}
          onEndReached={load}
          onEndThreshold={0}
          maxToRenderPerBatch={5}
          ListFooterComponent={renderSkeleton}
        />
      </VStack>
      {
        items.length ? (<></>) : (
          <NoData />
        )
      }
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
