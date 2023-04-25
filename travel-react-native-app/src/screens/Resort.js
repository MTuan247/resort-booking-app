import { Box, Center, HStack, Heading, Image, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';

export default function ResortScreen({ route, navigation }) {

  const { item } = route.params;

  const ResortImageOverlay = () => {
    return (
      <HStack style={styles.header}>
      </HStack>
    )
  }

  return (
    <Box style={styles.container}>
      <Image source={{
        uri: item.image
      }} borderBottomRadius={25} alt="Alternate Text" resizeMode="cover" height="50%" />
      <VStack margin={4}>
        <Heading lineHeight={24} fontWeight={600} fontSize={20}>{item.title}</Heading>
        <HStack alignItems={"center"}>
          <Icon as={Ionicons} name={"location-sharp"} size={18} color={global.theme.COLORS.PRIMARY} />
          <Text fontSize={15} color={global.theme.COLORS.LIGHTGRAY} fontWeight={600}>{item.location}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
  }
});
