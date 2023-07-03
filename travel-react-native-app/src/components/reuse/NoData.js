import { Box, Button, HStack, Heading, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import assets from '../../resources/assets';

export default function NoData(props) {

  return (
    <Box justifyContent={'center'} marginBottom={4} backgroundColor={global.theme.COLORS.WHITE} paddingX={2} paddingY={4} height={'100%'}>
      <Image height={200} resizeMode='contain' source={assets.IMAGE.NODATA} alt="Avatar"></Image>
      <VStack alignItems={'center'}>
        <Text marginY={4} color={global.theme.COLORS.GRAY}>Không có dữ liệu</Text>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({

});
