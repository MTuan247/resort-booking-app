import { Avatar, Box, Pressable, Divider, HStack, Heading, Image, ScrollView, Text, VStack, ZStack, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';
import { Dimensions } from 'react-native';

import resortApi from '../common/api/resort';
import { formatMoney } from '../common/function/format';
import screens from '../resources/screens';
import BaseButton from '../components/base/BaseButton';
import ShowDateRange from '../components/reuse/ShowDateRange';

const windowHeight = Dimensions.get('window').height;

export default function DetailScreen({ route, navigation }) {

  const [item, setItem] = useState({});

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
    });
  }

  /**
   * Xem danh sách hình ảnh
   */
  const showImageList = () => {
    navigation.navigate(screens.SCREEN.IMAGE, { item: item })
  }

  /**
   * Xem danh sách hình ảnh
   */
  const showPayment = () => {
    navigation.navigate(screens.SCREEN.PAYMENT, { resort: param.resort, room: item })
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
          </VStack>
          <Divider _light={{ bg: global.theme.COLORS.BORDER }} />
          <Box paddingX={4} paddingY={2}>
            <Text color={global.theme.COLORS.GRAY} >{item.description}</Text>
            <Box marginTop={2}>
              <Text fontWeight={600} fontSize={18} textTransform={"uppercase"}>Chi tiết</Text>
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
            {
              param.item?.order && (
                <Box marginTop={4}>
                  <Text fontWeight={600} fontSize={18} textTransform={"uppercase"}>Thông tin đặt phòng</Text>
                  <Text fontWeight={500} fontSize={14}>Trạng thái: {param.item.order?.status ? 'Đặt phòng thành công' : 'Đang xử lý'}</Text>
                  <ShowDateRange firstDate={param.item?.order.from_date}
                    secondDate={param.item?.order.to_date}></ShowDateRange>
                </Box>
              )
            }
          </Box>
        </ScrollView>
      </Box>
      {
        param.item?.order ? (
          <></>
        ) : (
          <HStack justifyContent={"space-between"} paddingX={6} alignItems={"center"} borderTopRadius={40} height={windowHeight * 0.1} backgroundColor={global.theme.COLORS.DARKGRAY}>
            <Text fontSize={16} color={theme.COLORS.WHITE}>{formatMoney(item.from_cost)} đ/ngày</Text>
            <BaseButton onPress={() => showPayment()} paddingLeft={4} paddingRight={4}>
              <HStack alignItems={"center"}>
                <Text color={global.theme.COLORS.WHITE}>Đặt ngay</Text>
                <Icon marginLeft={2} as={Ionicons} name={"arrow-forward"} size={18} color={global.theme.COLORS.WHITE} />
              </HStack>
            </BaseButton>
          </HStack>
        )
      }

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
