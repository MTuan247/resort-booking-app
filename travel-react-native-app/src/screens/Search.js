import { Box, FlatList, HStack, Pressable, ScrollView, Skeleton, VStack } from 'native-base';
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
import { Chip, BottomSheet } from '@rneui/themed';
import { ListItem } from '@rneui/base';

export default function SearchScreen() {

  const searchState = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noItem, setNoItem] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [sort, setSort] = useState('rate');
  const [order, setOrder] = useState('DESC');

  const sortList = [
    { title: 'Điểm cao nhất', field: 'rate', order: 'DESC' },
    { title: 'Giá rẻ nhất', field: 'from_cost', order: 'ASC' },
    { title: 'Giá đắt nhất', field: 'to_cost', order: 'DESC' },
  ];

  // useFocusEffect(
  //   useCallback(() => {
  //     load();
  //     return;
  //   }, [searchState.dateRange, searchState.location, searchState.numberOfPeople])
  // );
  
  /**
   * Load lại dữ liệu
   */
  useEffect(() => {
    load();
  }, [sort, order, searchState.dateRange, searchState.location, searchState.numberOfPeople])

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
    resortApi.search({...searchState, limit, offset, sort, order}).then(res => {
      let data = [...items, ...res.data];
      setItems(data);
      setOffset(data.length);
      setLoading(false);
      if (res.data?.length == 0) {
        setNoItem(true);
      }
    });
  }

  /**
   * Reset lại trạng thái khi load form
   */
  const reset = () => {
    setNoItem(false);
    setSortModal(false);
    setOffset(0);
    setItems([]);
  }

  /**
   * Load lại dữ liệu
   */
  const sortData = (item) => {
    reset();
    setSort(item.field);
    setOrder(item.order)
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

  /**
   * Nếu đang loading thì mở skeleton
   */
  if (!items.length && loading) {
    let arr = [1, 2, 3, 4, 5]
    return (
      <FlatList 
        data={arr}
        keyExtractor={item => item}
        renderItem={renderSkeleton}
        ListFooterComponent={renderSkeleton}
      />
    )
  }

  return (
    <Box marginTop={4} style={styles.container}>
      {
        searchState.showOnSearch && <SearchBar onSearch={() => reset()} />
      }
      <HStack marginLeft={2} marginBottom={2}>
        <Chip icon={{
              name: 'sort',
              type: 'material-community',
              size: 20,
              color: 'white',
            }} 
            onPress={() => setSortModal(true)}
            buttonStyle={styles.chipButton} title="Sắp xếp" />
      </HStack>
      <BottomSheet onBackdropPress={() => setSortModal(false)} modalProps={{}} isVisible={sortModal}>
        <VStack paddingTop={4} borderTopRadius={8} backgroundColor={global.theme.COLORS.WHITE}>
          {sortList.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={() => sortData(l)}
            >
              <ListItem.Content>
                <ListItem.Title style={{ color: l.field == sort && l.order == order ? global.theme.COLORS.PRIMARY : global.theme.COLORS.BLACK }}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </VStack>
      </BottomSheet>
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
    // paddingTop: 30,
  },
  chipButton: {
    backgroundColor: global.theme.COLORS.PRIMARY
  }
});
