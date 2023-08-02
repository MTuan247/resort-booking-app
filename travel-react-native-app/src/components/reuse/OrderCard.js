import { Box, HStack, Heading, Icon, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { formatMoney } from '../../common/function/format';
import { Ionicons } from 'react-native-vector-icons';
import ShowDateRange from './ShowDateRange';

export default function OrderCard(props) {

  const fromCost = formatMoney(props.cost);

  const price = fromCost;

  return (
    <Pressable marginBottom={4} paddingX={2} paddingY={4} backgroundColor={global.theme.COLORS.WHITE} onPress={typeof props.onPress == 'function' ? () => props.onPress() : () => {}}>
      <HStack marginBottom={0} paddingBottom={4} borderBottomWidth={1} borderColor={global.theme.COLORS.CARD}>
        
        <VStack flex={6}>
          <Heading fontSize={18} noOfLines={2} fontWeight={600}>{props?.parent_name|| props.title}</Heading>
          <Text>{props?.parent?.address || props.address}</Text>
          {
            props?.parent && (
              <VStack marginY={4}>
                <HStack alignItems={'center'}>
                  <Icon size={5} marginRight={1} color={global.theme.COLORS.BLACK} as={Ionicons} name='bed-outline'></Icon>
                  <Text fontWeight={500} fontSize={16}>{props.title}</Text>
                </HStack>
                <HStack alignItems={'center'}>
                  <Icon size={5} marginRight={1} color={global.theme.COLORS.BLACK} as={Ionicons} name='people-outline'></Icon>
                  <Text fontWeight={500} fontSize={16}>{props.max_people}</Text>
                  <Text fontWeight={500} fontSize={16}> người</Text>
                </HStack>
              </VStack>
            )
            
          }
          <Box justifyContent="flex-end" flex={1}>
            
          </Box>
        </VStack>

        <Image borderRadius={8} flex={2} source={{
          uri: props.image
        }} alt={props.title}></Image>

      </HStack>
      
      <ShowDateRange firstDate={props?.from_date} secondDate={props?.to_date} />

      <HStack marginTop={4} paddingTop={4} borderTopWidth={1} borderColor={global.theme.COLORS.CARD}>
        <Text fontWeight={500} fontSize={16}>Tổng tiền: </Text>
        <Text fontWeight={600} fontSize={16}>{price}đ</Text>
      </HStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({

});
