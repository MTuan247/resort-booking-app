import { VStack, Icon, Heading, HStack, Box, Text } from 'native-base';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

import DateRange from '../modal/DateRange';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../common/function/format';
import moment from 'moment';

export default function ShowDateRange({ firstDate, secondDate }) {

  const searchState = useSelector((state) => state.search);

  const [selectedRange, setRange] = useState(searchState.dateRange);

  moment.locale('vi')

  const COLORS = global.theme.COLORS;

  return (
    <HStack paddingY={4} alignItems={'center'}>
      <Icon size={6} color={COLORS.BLACK} as={FontAwesome} name='calendar-o' />
      <>
        <Heading marginTop={1} marginX={3} fontWeight={500}>{formatDate(firstDate, 'DD')}</Heading>
        <VStack flex={1}>
          <Text fontWeight={500}>Tháng {formatDate(firstDate, 'M')}</Text>
          <Text>Thứ {moment(firstDate).day() + 1}</Text>
        </VStack>
      </>
      <Box marginX={2} rounded={'full'} padding={1} borderWidth={.5}>
        <Icon size={3} color={COLORS.BLACK} as={Ionicons} name='moon-outline' />
      </Box>
      <Icon size={6} color={COLORS.BLACK} />
      <>
        <Heading marginTop={1} marginX={3} fontWeight={500}>{formatDate(secondDate, 'DD')}</Heading>
        <VStack flex={1}>
          <Text fontWeight={500}>Tháng {formatDate(secondDate, 'M')}</Text>
          <Text>Thứ {moment(secondDate).day() + 1}</Text>
        </VStack>
      </>
    </HStack>
  )
}

const styles = StyleSheet.create({
  input: {
  }
});
