import { Box, Center, Heading, Image, Pressable, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Icon } from 'native-base';
import Carousel from '../base/Carousel';
import resortApi from '../../common/api/resort';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import screens from '../../resources/screens';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// const slideList = Array.from({ length: 5 }).map((_, i) => {
//   return {
//     id: i,
//     image: `https://picsum.photos/1440/2842?random=${i}`,
//     title: `This is the title ${i + 1}!`,
//     description: `This is the description ${i + 1}!`,
//   };
// });

export default function HomeSuggestion() {

  const contextState = useSelector((state) => state.context);

  const navigation = useNavigation();

  /**
   * Mở form chi tiết
   */
  const showDetail = (item) => {
    navigation.navigate(screens.SCREEN.RESORT, { item: item, title: 'Trang chủ' })
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    resortApi.suggestion().then(res => {
      setData(res.data)
    })
  }, [contextState.loggedIn]);

  return (
    <>
      <Carousel
        data={data}
        keyExtractor={(item) => item.resort_id}
        renderItem={({ item }) => (
          <Pressable onPress={() => showDetail(item)} position='relative' height={320} borderRadius={25} backgroundColor={global.theme.COLORS.LIGHTGRAY} style={styles.suggestions}>
            <Image margin={4} source={{
              uri: item.image
            }} borderRadius={25} alt="Alternate Text" style={styles.cover} resizeMode="cover" height='200' />
            <Box marginX={4} marginBottom={2}>
              <Heading noOfLines={1} fontSize={16} fontWeight={700}>{item.title}</Heading>
              <Text noOfLines={2}>{item.description}</Text>
            </Box>
            <Center height={10} width={10} borderRadius={100} backgroundColor={global.theme.COLORS.WHITE} style={styles.heart}>
              <Icon as={FontAwesome} name={item.users?.length ? 'heart' : 'heart-o'} size={6} color={item.users?.length ? global.theme.COLORS.PRIMARY : global.theme.COLORS.BLACK} />
            </Center>
          </Pressable>
        )}
      ></Carousel>
    </>
  )
}

const styles = StyleSheet.create({
  suggestions: {
    width: windowWidth
  },
  heart: {
    position: 'absolute',
    top: '12%',
    right: '12%',
  }
});
