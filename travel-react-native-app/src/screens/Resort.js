import { Avatar, Box, Pressable, Divider, HStack, Heading, Image, ScrollView, Text, VStack, ZStack, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';
import { Dimensions } from 'react-native';
import screens from '../resources/screens';

import resortApi from '../common/api/resort';
import { useSelector, useDispatch } from 'react-redux';
import { formatMoney } from '../common/function/format';
import { useToast } from 'native-base';

const windowHeight = Dimensions.get('window').height;

export default function ResortScreen({ route, navigation }) {

  const context = useSelector((state) => state.context);
  const toast = useToast();
  const [item, setItem] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const param = route.params;

  useEffect(() => {
    load(param.item.resort_id);
  }, []);

  /**
   * Load dữ liệu
   */
  const load = async (id) => {
    resortApi.get(id).then(res => {
      setItem(res.data);
      setIsLiked(res.data.liked);
    });
  }

  /**
   * Xử lý thích
   */
  const like = () => {
    if (!context.loggedIn) {
      toast.show({
        description: "Đăng nhập để có thể dùng chức năng này"
      });
      return;
    }
    resortApi.like({
      resort_id: item.resort_id
    }).then(() => {
      setIsLiked(!isLiked);
    });
  }

  /**
   * Xem danh sách hình ảnh
   */
  const showImageList = () => {
    navigation.navigate(screens.SCREEN.IMAGE, { item: item })
  }

  
  /**
   * Xem phòng chi tiết
   * @param {*} detail 
   */
  const showDetail = (detail) => {
    navigation.navigate(screens.SCREEN.DETAIL, { item: detail, title: item.title })
  }

  return (
    <>
      <Box style={styles.container}>
        <ScrollView>

          <Image source={{
            uri: item.image
          }} borderBottomRadius={25} alt="Alternate Text" resizeMode="cover" height={windowHeight * 0.4} />

          <VStack margin={4}>
            <Heading lineHeight={24} fontWeight={600} fontSize={20}>{item.title}</Heading>
            <HStack paddingTop={1} alignItems={"center"}>
              <HStack flex={1} alignItems={"center"}>
                <Icon as={Ionicons} name={"location-sharp"} size={5} color={global.theme.COLORS.PRIMARY} />
                <Text marginLeft={1} fontSize={15} color={global.theme.COLORS.GRAY} fontWeight={600}>{item.address}</Text>
              </HStack>
              <Pressable onPress={() => like()}>
                {
                  isLiked ? (
                    <Icon as={Ionicons} name={"heart"} size={6} color={global.theme.COLORS.PRIMARY} />
                  ) : (
                    <Icon as={Ionicons} name={"heart-outline"} size={6} color={global.theme.COLORS.PRIMARY} />
                  )
                }
              
              </Pressable>
            </HStack>
          </VStack>
          <Divider _light={{ bg: global.theme.COLORS.BORDER }} />
          <Box paddingX={4} paddingY={2}>
            <Text color={global.theme.COLORS.GRAY} >{item.description}</Text>
            <Box marginTop={2}>
              <Text fontWeight={600} fontSize={18} textTransform={"uppercase"}>Dịch vụ</Text>
              <ScrollView horizontal={true} marginTop={1}>
                {
                  item.articles && item.articles.map(article => {
                    return (
                      <Pressable onPress={() => showImageList()} key={article.article_id} >
                        <VStack marginRight={2} alignItems="center">
                          <Avatar source={{ uri: article.images[0]?.src }}></Avatar>
                          <Text>{article.title}</Text>
                        </VStack>
                      </Pressable>
                    )
                  })
                }
              </ScrollView>
            </Box>
          </Box>
          <Box paddingX={4} marginTop={2} paddingY={2}>
            <Text fontWeight={600} fontSize={18} textTransform={"uppercase"}>Chi tiết</Text>
            <ScrollView marginTop={1}>
              {
                item.details && item.details.map(detail => {
                  return (
                    <Box marginBottom={2} key={detail.resort_id} >
                      <VStack marginBottom={2} marginRight={2}>
                        <Pressable onPress={() => showDetail(detail)}>
                          <Image borderRadius={12} alt={detail.title} resizeMethod='scale' height={windowHeight * 0.2} source={{ uri: detail.image }}></Image>
                          <HStack alignItems={'center'}>
                            <Text flex={1} marginY={2} fontSize={16} fontWeight={600}>{detail.title}</Text>
                            <Icon color={global.theme.COLORS.BLACK} size={6} as={Ionicons} name='chevron-forward'></Icon>
                          </HStack>
                        </Pressable>
                        <HStack alignItems={'center'}>
                          <Text flex={1} color={global.theme.COLORS.PRICE} fontSize={16}>{formatMoney(detail.from_cost)} đ</Text>
                          <Button bg={global.theme.COLORS.PRIMARY} borderRadius={12}>Đặt ngay</Button>
                        </HStack>
                      </VStack>
                    </Box>
                  )
                })
              }
            </ScrollView>
          </Box>
        </ScrollView>
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
