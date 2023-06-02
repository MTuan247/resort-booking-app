import { Avatar, Box, HStack, Heading, VStack, Text, Pressable, Icon, Divider } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import screens from '../resources/screens';
import { logout } from '../redux/reducer/contextReducer';
import assets from '../resources/assets';

export default function ProfileScreen({ navigation }) {

  const context = useSelector((state) => state.context);

  const dispatch = useDispatch();

  const loginForm = () => {
    navigation.navigate(screens.SCREEN.LOGIN);
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box style={styles.container}>
      <HStack marginX={2}>
        <Avatar background={global.theme.COLORS.CARD} size={75} source={context.user?.avatar ? {
          uri: context.user?.avatar
        } : assets.IMAGE.ANONYMOUS}>
        </Avatar>
        <VStack justifyContent={"space-between"} marginLeft={4}>
          {
            context.loggedIn ? (
              <>
                <Heading fontWeight={600} fontSize={20}>Nguyen Minh Tuan</Heading>
                <Box alignSelf={"flex-start"} borderTopLeftRadius={8} borderBottomRightRadius={8} backgroundColor={global.theme.COLORS.DARKGRAY}>
                  <Text paddingX={4} color={global.theme.COLORS.WHITE} fontSize={16}>Thành viên</Text>
                </Box>
                <Pressable flexDirection={"row"}>
                  <Text color={global.theme.COLORS.BLUE} >Thông tin của tôi</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => loginForm()} flex={1} flexDirection={"row"} alignItems={"center"}>
                  <Text underline fontSize={18} color={global.theme.COLORS.BLACK} >Đăng nhập/ Đăng ký</Text>
                </Pressable>
              </>
            )
          }
        </VStack>
      </HStack>

      <HStack marginTop={8} justifyContent={"space-evenly"}>
        <Pressable>
          <VStack alignItems={"center"}>
            <Icon as={Ionicons} name={"heart-outline"} size={30} color={global.theme.COLORS.BLACK} />
            <Text>Yêu thích</Text>
          </VStack>
        </Pressable>

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

        <Pressable onPress={handleLogout} paddingY={2} flexDirection={"row"} alignItems={'center'}>
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
