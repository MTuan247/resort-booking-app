import { Box, Center, HStack, Heading, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Icon } from 'native-base';

export default function SearchCard(props) {
  return (
    <Pressable onPress={typeof props.onPress == 'function' ? () => props.onPress() : () => {}}>
      <HStack marginBottom={4} backgroundColor={global.theme.COLORS.WHITE} paddingX={2} paddingY={4} height={150}>
        <Image borderRadius={8} flex={2} source={{
          uri: props.image
        }} alt={props.title}></Image>
        <VStack pl={2} flex={8}>
          <Heading noOfLines={2} fontWeight={600}>{props.title}</Heading>
          <Text>{props.description}</Text>
          <Box justifyContent="flex-end" flex={1}>
            <Text fontWeight={500} fontSize={18} textAlign="right">{props.price}</Text>
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({

});
