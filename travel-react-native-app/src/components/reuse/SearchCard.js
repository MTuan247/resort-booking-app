import { Box, HStack, Heading, Icon, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { formatMoney } from '../../common/function/format';
import { scoreRangeDescriptor } from '../../common/function/feedback';
import { FontAwesome5 } from 'react-native-vector-icons';

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

            <HStack alignItems={"center"}>
              {
                props?.rate != undefined ? (
                  <HStack borderRadius={8} backgroundColor={global.theme.COLORS.PRIMARY} alignItems={"center"}>
                    <Icon color={global.theme.COLORS.WHITE} m={1} size={4} as={FontAwesome5} name='umbrella-beach'></Icon>
                    <Text color={global.theme.COLORS.WHITE} p={1}>{Math.round(props?.rate * 10) / 10}</Text>
                  </HStack>
                ) : (<></>)
              }

              <Text flex={1} color={global.theme.COLORS.PRICE} fontWeight={500} fontSize={16} textAlign="right">{price}</Text>

            </HStack>
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({

});
