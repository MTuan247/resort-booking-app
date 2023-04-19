import { Input, VStack, Heading, Icon, Pressable, HStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import BaseButton from '../base/BaseButton';

export default function SearchBar({ style }) {

  const [calendar, setCalender] = useState(false);
  const [date, setDate] = useState(new Date());

  const showCalender = () => {
    setCalender(true);
  }

  const onChangeDate = () => {
    setCalender(false);

  }

  return (
    <VStack style={style} space={2} alignSelf="center">
      <Input
        placeholder="Khu vực"
        width="100%"
        borderRadius="12"
        py="2"
        backgroundColor={global.theme.COLORS.WHITE}
        px="1"
        borderWidth={0}
        fontSize="16"
        fontFamily={global.theme.FONTS.PRIMARY}
        InputLeftElement={
          <Icon
            m="2" ml="3" size="6" color={global.theme.COLORS.BLACK}
            as={
              <Ionicons name="search-outline" />
            }
          />
        }
      />
      <Pressable onPress={showCalender}>
        <Input
          width="100%"
          borderRadius="12"
          py="2"
          backgroundColor={global.theme.COLORS.WHITE}
          px="1"
          fontSize="16"
          borderWidth={0}
          fontFamily={global.theme.FONTS.PRIMARY}
          value={date.toLocaleString()}
          editable={false}
          InputLeftElement={
            <Icon
              m="2" ml="3" size="6" color={global.theme.COLORS.BLACK}
              as={
                <FontAwesome name="calendar-o" />
              }
            />
          }
        /></Pressable>
      <Input
        placeholder="Số người"
        width="100%" 
        borderRadius="12"
        borderWidth={0}
        backgroundColor={global.theme.COLORS.WHITE}
        py="2"
        px="1"
        fontFamily={global.theme.FONTS.PRIMARY}
        fontSize="16"
        InputLeftElement={
          <Icon
            m="2" ml="3" size="6" color={global.theme.COLORS.BLACK}
            as={
              <Ionicons name="people-outline" />
            }
          />
        }
      />
      {calendar && <DateTimePicker onChange={onChangeDate} value={date} />}
      <HStack alignSelf="center">
        <BaseButton mt={1} width="40%" backgroundColor={global.theme.COLORS.PRIMARY}>Tìm kiếm</BaseButton>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  input: {
  }
});
