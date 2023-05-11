import { VStack, Icon, Pressable, HStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

import DateRange from '../modal/DateRange';

import BaseButton from '../base/BaseButton';
import BaseInput from '../base/BaseInput';
import { useNavigation } from '@react-navigation/native';
import screens from '../../resources/screens';
import SelectLocation from '../modal/SelectLocation';

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

  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  const [selectedRange, setRange] = useState(null);
  
  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  const showDateRange = () => {
    setDateRangeModal(true);
  }

  const showSelectLocation = () => {
    setLocationModal(true);
  }

  return (
    <VStack style={style} space={2} alignSelf="center">
      <Pressable onPress={showSelectLocation}>
        <SearchInput
          editable={false}
          value={location}
          leftIcon={<Ionicons name="search-outline" />}
        />
      </Pressable>
      <Pressable onPress={showDateRange}>
        <SearchInput
          value={!selectedRange ? null : `${selectedRange.firstDate} - ${selectedRange.secondDate}`}
          editable={false}
          leftIcon={<FontAwesome name="calendar-o" />}
        /></Pressable>
      <SearchInput
        keyboardType={'numeric'}
        leftIcon={<Ionicons name="people-outline" />}
      />
      <DateRange 
        visible={dateRangeModal} 
        setVisible={setDateRangeModal} 
        setRange={(dateRange) => setRange(dateRange)} />
      <SelectLocation 
        onSelect={(location) => setLocation(location.location_name)} 
        visible={locationModal} 
        setVisible={(visible) => setLocationModal(visible)}
      ></SelectLocation>
      
      <HStack alignSelf="center">
        <BaseButton onPress={() => navigation.navigate(screens.STACKS.HOME, { screen: screens.SCREEN.SEARCH })} mt={1} width="40%" backgroundColor={global.theme.COLORS.PRIMARY}>Tìm kiếm</BaseButton>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  input: {
  }
});
