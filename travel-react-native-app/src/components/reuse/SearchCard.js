import { Box, HStack, Heading, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { formatMoney } from '../../common/function/format';

export default function SearchCard(props) {

  const fromCost = formatMoney(props.from_cost);
  const toCost = formatMoney(props.to_cost);

  const price = fromCost + (toCost ? ` - ${toCost}` : '');

  return (
    <Pressable onPress={typeof props.onPress == 'function' ? () => props.onPress() : () => {}}>
      <HStack marginBottom={4} backgroundColor={global.theme.COLORS.WHITE} paddingX={2} paddingY={4} height={150}>
        <Image borderRadius={8} flex={2} source={{
          uri: props.image
        }} alt={props.title}></Image>
        <VStack pl={2} flex={8}>
          <Heading fontSize={18} noOfLines={2} fontWeight={600}>{props.title}</Heading>
          <Text>{props.address}</Text>
          <Box justifyContent="flex-end" flex={1}>
            <Text color={global.theme.COLORS.PRICE} fontWeight={500} fontSize={16} textAlign="right">{price}</Text>
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({

});
