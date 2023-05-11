import { Avatar, Box, HStack, Heading, VStack, Text, Pressable, Icon, Divider } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <Box style={styles.container}>
      <HStack marginX={2}>
        <Avatar size={75} source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }}>
          AJ
        </Avatar>
        <VStack justifyContent={"space-between"} marginLeft={4}>
          <Heading fontWeight={600} fontSize={20}>Nguyen Minh Tuan</Heading>
          <Box alignSelf={"flex-start"} borderTopLeftRadius={8} borderBottomRightRadius={8} backgroundColor={global.theme.COLORS.DARKGRAY}>
            <Text paddingX={4} color={global.theme.COLORS.WHITE} fontSize={16}>Thành viên</Text>
          </Box>
          <Pressable flexDirection={"row"}>
            <Text color={global.theme.COLORS.BLUE} >Thông tin của tôi</Text>
          </Pressable>
        </VStack>
      </HStack>
      <HStack marginTop={8} justifyContent={"space-evenly"}>
        <VStack alignItems={"center"}>
          <Icon as={Ionicons} name={"heart-outline"} size={30} color={global.theme.COLORS.BLACK} />
          <Text>Yêu thích</Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Icon as={Ionicons} name={"notifications-outline"} size={30} color={global.theme.COLORS.BLACK} />
          <Text>Thông báo</Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Icon as={Ionicons} name={"document-text-outline"} size={30} color={global.theme.COLORS.BLACK} />
          <Text>Đơn hàng</Text>
        </VStack>
      </HStack>
      <VStack margin={4} padding={2} borderRadius={4} borderWidth={.5} borderColor={global.theme.COLORS.BORDER}>

        <Pressable paddingY={2} flexDirection={"row"} alignItems={'center'}>
          <Icon marginLeft={2} marginRight={4} as={Ionicons} name={"call-outline"} size={25} color={global.theme.COLORS.BLACK} />
          <Text>Hotline: <Text fontWeight={700}>1900 0000</Text></Text>
        </Pressable>

        <Divider height={.1} opacity={0.2} bg={global.theme.COLORS.BORDER}></Divider>

        <Pressable paddingY={2} flexDirection={"row"} alignItems={'center'}>
          <Icon marginLeft={2} marginRight={4} as={Ionicons} name={"exit-outline"} size={25} color={global.theme.COLORS.BLACK} />
          <Text>Đăng xuất</Text>
        </Pressable>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
});
