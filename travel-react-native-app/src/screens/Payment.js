import { Image, Box, HStack, Alert, VStack, Text, Pressable, Icon, useToast, Input, Button, Heading, ScrollView } from 'native-base';
import React, { useRef, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons';

import { formatDate, formatMoney } from '../common/function/format';
import ShowDateRange from '../components/reuse/ShowDateRange';
import resortApi from '../common/api/resort';
import DateRange from '../components/modal/DateRange';
import { validateEmail, validatePhone } from '../common/function/validate';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function PaymentScreen({ route }) {

  const contextState = useSelector((state) => state.context);
  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const toast = useToast();

  const [name, setName] = useState(contextState.user?.name);
  const [email, setEmail] = useState(contextState.user?.email);
  const [tel, setTel] = useState(contextState.user?.tel);

  const nameInput = useRef();
  const emailInput = useRef();
  const telInput = useRef();

  const [dateRangeModal, setDateRangeModal] = useState(false);

  const [selectedRange, setRange] = useState(searchState.dateRange);

  const setDateRange = (dateRange) => {
    if (!dateRange || !dateRange.firstDate || !dateRange.secondDate) {
      return;
    }
    setRange(dateRange)
  }

  const param = route.params;

  const showToastMsg = (type) => {
    let msg = 'Bạn chưa điền đủ thông tin.';
    switch (type) {
      case 'validate':
        msg = 'Không đúng định dạng.';
        break;
    }
    toast.show({
      render: () => {
        return (
          <Box width={windowWidth * 0.9} bg={global.theme.COLORS.RED} px="3" py="2" rounded="sm">
            <Text fontSize={16} color={global.theme.COLORS.WHITE}>{msg}</Text>
          </Box>
        );
      },
      placement: 'top'
    })
  }

  const book = () => {
    if (!name) {
      showToastMsg();
      nameInput.current.focus();
      return;
    }

    if (!email) {
      showToastMsg();
      emailInput.current.focus();
      return;
    }

    if (!tel) {
      showToastMsg();
      telInput.current.focus();
      return;
    }

    if (!validateEmail(email)) {
      showToastMsg('validate');
      emailInput.current.focus();
      return;
    }

    if (!validatePhone(tel)) {
      showToastMsg('validate');
      telInput.current.focus();
      return;
    }

    resortApi.book({
      resort_id: param.room.resort_id,
      from_date: selectedRange.firstDate,
      to_date: selectedRange.secondDate,
    }).then(() => {
      navigation.goBack();
    })
  }

  return (
    <VStack flex={1} background={global.theme.COLORS.LIGHTGRAY}>
      <DateRange visible={dateRangeModal}
        setVisible={setDateRangeModal}
        setRange={(dateRange) => setDateRange(dateRange)}></DateRange>
      <ScrollView>
        <VStack padding={3} borderRadius={8} margin={4} backgroundColor={global.theme.COLORS.WHITE}>
          <HStack>
            <VStack flex={3}>
              <Heading numberOfLines={1} fontSize={14}>{param.resort?.title}</Heading>
              <VStack borderLeftWidth={2} borderLeftColor={global.theme.COLORS.GRAY} marginTop={4} paddingLeft={2}>
                <Heading fontSize={12}>{param.room?.title}</Heading>
                <Text marginTop={2}>{param.room?.description}</Text>
              </VStack>
            </VStack>
            <Image marginLeft={4} borderRadius={8} flex={1} resizeMethod='scale' alt={param.room.title} source={{
              uri: param.room.image
            }}>
            </Image>
          </HStack>
          <VStack marginTop={6} borderTopWidth={1} borderTopColor={global.theme.COLORS.LIGHTGRAY} paddingTop={3}>
            <Heading fontWeight={600} numberOfLines={1} fontSize={14}>{name}</Heading>
            <Text marginTop={1} fontSize={12}>{tel}</Text>
            <Text marginTop={1} fontSize={12}>{email}</Text>
          </VStack>
        </VStack>

        <VStack padding={4} backgroundColor={global.theme.COLORS.WHITE}>
          <Heading fontWeight={600} fontSize={18}>Thông tin đặt phòng</Heading>
          <Pressable onPress={() => setDateRangeModal(true)}>
            <ShowDateRange firstDate={selectedRange?.firstDate} secondDate={selectedRange?.secondDate} />
          </Pressable>
        </VStack>

        <VStack marginTop={2} padding={4} backgroundColor={global.theme.COLORS.WHITE}>
          <Heading fontWeight={600} fontSize={18}>Thông tin liên hệ</Heading>

          <Text marginTop={2} color={global.theme.COLORS.DARKGRAY}>Họ tên</Text>
          <Input ref={nameInput} fontSize={16} height={10} variant="underlined" value={name} onChangeText={text => setName(text)}></Input>

          <Text marginTop={2} color={global.theme.COLORS.DARKGRAY}>Email</Text>
          <Input ref={emailInput} fontSize={16} height={10} variant="underlined" value={email} onChangeText={text => setEmail(text)}></Input>

          <Text marginTop={2} color={global.theme.COLORS.DARKGRAY}>Số điện thoại</Text>
          <Input ref={telInput} keyboardType={'numeric'} fontSize={16} height={10} variant="underlined" value={tel} onChangeText={text => setTel(text)}></Input>

        </VStack>
      </ScrollView>
      <HStack borderTopWidth={.5} borderTopColor={global.theme.COLORS.LIGHTGRAY} justifyContent={"space-between"} paddingX={6} alignItems={"center"} height={windowHeight * 0.1} backgroundColor={global.theme.COLORS.WHITE}>
        <VStack>
          <Text color={theme.COLORS.DARKGRAY}>Tổng tiền</Text>
          <Text fontSize={18} color={theme.COLORS.BLACK}>{formatMoney(param.room.from_cost)}đ</Text>
        </VStack>
        <Button onPress={() => book()} bg={global.theme.COLORS.PRIMARY} paddingLeft={4} paddingRight={4}>
          <Text color={global.theme.COLORS.WHITE}>Đặt ngay</Text>
        </Button>
      </HStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
});
