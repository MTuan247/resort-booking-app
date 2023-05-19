import { Avatar, Box, Pressable, Divider, HStack, Heading, Image, ScrollView, Text, VStack, ZStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';
import { Dimensions } from 'react-native';
import BaseButton from '../components/base/BaseButton';

import resortApi from '../common/api/resort';

const windowHeight = Dimensions.get('window').height;

export default function ResortScreen({ route, navigation }) {

  const [item, setItem] = useState({ });

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
  
  const showImageList = () => {
    navigation.navigate("ImageScreen")
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
              <Icon as={Ionicons} name={"location-sharp"} size={18} color={global.theme.COLORS.PRIMARY} />
              <Text fontSize={15} color={global.theme.COLORS.GRAY} fontWeight={600}>{item.location}</Text>
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
                          <Avatar source={{ uri: article.image }}></Avatar>
                          <Text>{article.title}</Text>
                        </VStack>
                      </Pressable>
                    )
                  })
                }
              </ScrollView>
            </Box>
          </Box>
        </ScrollView>
      </Box>
      <HStack justifyContent={"space-between"} paddingX={6} alignItems={"center"} borderTopRadius={40} height={windowHeight * 0.1} backgroundColor={global.theme.COLORS.DARKGRAY}>
        <Text fontSize={20} color={theme.COLORS.WHITE}>{item.price}</Text>
        <BaseButton paddingLeft={4} paddingRight={4}>
          <HStack alignItems={"center"}>
            <Text color={global.theme.COLORS.WHITE}>Đặt ngay</Text>
            <Icon marginLeft={2} as={Ionicons} name={"arrow-forward"} size={18} color={global.theme.COLORS.WHITE} />
          </HStack>
        </BaseButton>
      </HStack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
