import { Box, Center, Heading, Image, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Icon } from 'native-base';

export default function HomeSuggestion({ navigation }) {
  return (
    <Box position='relative' height={320} borderRadius={25} backgroundColor={global.theme.COLORS.LIGHTGRAY} style={styles.suggestions}>
      <Image margin={4} source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F12de4890-b4d3-11ed-9c5f-b94700cd92b3%2F1676556753961-872309572.jpg?alt=media"
      }} borderRadius={25} alt="Alternate Text" style={styles.cover} resizeMode="cover" height='200' />
      <Box marginX={4} marginBottom={2}>
        <Heading noOfLines={1} fontSize={16} fontWeight={700}>Onsen Villas Resort</Heading>
        <Text noOfLines={2}>Onsen Villas Resort – điểm đến yên bình theo phong cách Nhật Bản hòa giữa thiên nhiên vùng Hoà Bình tươi đẹp.</Text>
      </Box>
      <Center height={10} width={10} borderRadius={100} backgroundColor={global.theme.COLORS.WHITE} style={styles.heart}>
        <Icon as={FontAwesome} name='heart-o' size={6} color={global.theme.COLORS.BLACK} />
      </Center>
    </Box>
  )
}

const styles = StyleSheet.create({
  suggestions: {

  },
  heart: {
    position: 'absolute',
    top: '12%',
    right: '12%',
  }
});
