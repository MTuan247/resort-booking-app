import { Box, Center, HStack, Heading, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Icon } from 'native-base';

export default function SearchCard() {
  return (
    <Pressable>
      <HStack marginBottom={4} backgroundColor={global.theme.COLORS.WHITE} paddingX={2} paddingY={4} height={150}>
        <Image borderRadius={8} flex={2} source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F12de4890-b4d3-11ed-9c5f-b94700cd92b3%2F1676556753961-872309572.jpg?alt=media"
        }} alt="InterContinental Phú Quốc"></Image>
        <VStack pl={2} flex={8}>
          <Heading noOfLines={2} fontWeight={600}>Onsen Villas Resort</Heading>
          <Text>Thành phố Hoà Bình, Tỉnh Hoà Bình</Text>
          <Box justifyContent="flex-end" flex={1}>
            <Text fontWeight={500} fontSize={18} textAlign="right">3.800.000đ - 4.000.000đ</Text>
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({

});
