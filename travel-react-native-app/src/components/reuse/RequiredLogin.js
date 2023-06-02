import { Box, Button, HStack, Heading, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function RequiredLogin(props) {

  return (
    <Box justifyContent={'center'} marginBottom={4} backgroundColor={global.theme.COLORS.WHITE} paddingX={2} paddingY={4} height={'100%'}>
      <Image height={200} resizeMode='contain' source={require('../../../assets/images/anonymous.png')} alt="Avatar"></Image>
      <VStack alignItems={'center'}>
        <Text marginY={4} color={global.theme.COLORS.GRAY}>Đăng nhập để có thể sử dụng tính năng này</Text>
        <Button bg={global.theme.COLORS.PRIMARY}>Đăng nhập</Button>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({

});
