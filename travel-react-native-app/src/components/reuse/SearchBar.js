import { VStack, Icon, Pressable, HStack } from 'native-base';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

import DateRange from '../modal/DateRange';
import BaseButton from '../base/BaseButton';
import BaseInput from '../base/BaseInput';
import { useNavigation } from '@react-navigation/native';
import screens from '../../resources/screens';
import SelectLocation from '../modal/SelectLocation';
import { saveSearch } from '../../redux/reducer/searchReducer.js'
import { formatDate } from '../../common/function/format';

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

  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  const [selectedRange, setRange] = useState(searchState.dateRange);
  const [location, setLocation] = useState(searchState.location);
  const [numberOfPeople, setNumberOfPeople] = useState(searchState.numberOfPeople);

  const navigation = useNavigation();

  /**
   * Mở form chọn ngày tháng
   */
  const showDateRange = () => {
    setDateRangeModal(true);
  }

  /**
   * Mở form chọn địa điểm
   */
  const showSelectLocation = () => {
    setLocationModal(true);
  }

  /**
   * press tìm kiếm
   */
  const handleSearch = () => {
    dispatch(saveSearch({
      dateRange: selectedRange,
      location: location,
      numberOfPeople: numberOfPeople
    }));
    navigation.navigate(screens.STACKS.HOME, { screen: screens.SCREEN.SEARCH });
  }

  /**
   * format lại daterange
   * @returns *
   */
  const dateSearch = () => {
    if (!selectedRange) {
      return null;
    }

    let result = formatDate(selectedRange.firstDate);

    if (selectedRange.secondDate) {
      result += ` - ${formatDate(selectedRange.secondDate)}`;
    }
    return result;
  }

  return (
    <VStack marginX={4} marginY={4} style={style} space={2} alignSelf="center">
      <Pressable onPress={showSelectLocation}>
        <SearchInput
          editable={false}
          value={location}
          leftIcon={<Ionicons name="search-outline" />}
        />
      </Pressable>
      <Pressable onPress={showDateRange}>
        <SearchInput
          value={dateSearch()}
          editable={false}
          leftIcon={<FontAwesome name="calendar-o" />}
        /></Pressable>
      <SearchInput
        keyboardType={'numeric'}
        value={numberOfPeople}
        onChangeText={(number) => setNumberOfPeople(number)}
        leftIcon={<Ionicons name="people-outline" />}
      />
      <DateRange
        visible={dateRangeModal}
        setVisible={setDateRangeModal}
        setRange={(dateRange) => setRange(dateRange)} />
      {
        locationModal && 
        <SelectLocation
          onSelect={(location) => setLocation(location.location_name)}
          visible={locationModal}
          setVisible={(visible) => setLocationModal(visible)}
        />
      }

      <HStack alignSelf="center">
        <BaseButton onPress={() => handleSearch()} mt={1} width="40%" backgroundColor={global.theme.COLORS.PRIMARY}>Tìm kiếm</BaseButton>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  input: {
  }
});
