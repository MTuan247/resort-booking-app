import { Input, VStack, Heading, Icon, Pressable, HStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import BaseButton from '../base/BaseButton';
import BaseInput from '../base/BaseInput';
import { useNavigation } from '@react-navigation/native';
import screens from '../../resources/screens';

/**
 * Input trong searchBar
 * @param {*} props 
 * @returns 
 */
const SearchInput = (props) => {
  return <BaseInput
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
        as={props.leftIcon}
      />
    }
    {...props}
  />
}

export default function SearchBar({ style }) {

  const [calendar, setCalender] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigation = useNavigation();

  const showCalender = () => {
    setCalender(true);
  }

  const onChangeDate = (e, value) => {
    setCalender(false);
    setDate(value);
  }

  return (
    <VStack style={style} space={2} alignSelf="center">
      <SearchInput
        leftIcon={<Ionicons name="search-outline" />}
      />
      <Pressable onPress={showCalender}>
        <SearchInput
          value={date.toLocaleString()}
          editable={false}
          leftIcon={<FontAwesome name="calendar-o" />}
        /></Pressable>
      <SearchInput
        leftIcon={<Ionicons name="people-outline" />}
      />
      {calendar && <DateTimePicker onChange={onChangeDate} value={date} />}
      <HStack alignSelf="center">
        <BaseButton onPress={() => navigation.navigate(screens.STACKS.HOME, { screen: screens.SCREEN.SEARCH})} mt={1} width="40%" backgroundColor={global.theme.COLORS.PRIMARY}>Tìm kiếm</BaseButton>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  input: {
  }
});
