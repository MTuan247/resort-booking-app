import { Box, HStack, VStack, Text, Pressable, Icon, FormControl, Input, Button } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from '@rneui/themed';
import MyAlert from '../components/alert/MyAlert';
import { login } from '../redux/reducer/contextReducer';
import screens from '../resources/screens';
import { useNavigation } from '@react-navigation/native';
import authApi from '../common/api/auth';
import { validateEmail, validatePhone, validateUsername } from '../common/function/validate';

export default function RegisterScreen() {

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [userName, setUserName] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [password, setPassword] = useState(null);
  const [rewritePassword, setRewritePassword] = useState(null);

  const [error, setError] = useState(null);
  const [isResort, setIsResort] = useState(false);

  /**
   * Cảnh báo khi đặt phòng
   */
  const showError = (msg) =>
    Alert.alert('Thông báo', msg, [
      { text: 'Đồng ý', onPress: () => console.log('OK Pressed') },
    ]);

  const handleRegister = async () => {
    if (!userName) {
      showError('Tên tài khoản không được để trống.');
      return;
    }

    if (!validateUsername(userName)) {
      showError('Tên tài khoản không thể chứa khoảng trống và các ký tự đặc biệt.');
      return;
    }

    if (!name) {
      showError('Họ và tên không được để trống.');
      return;
    }

    if (!email) {
      showError('Email không được để trống.');
      return;
    }

    if (!validateEmail(email)) {
      showError('Email không đúng định dạng.');
      return;
    }

    if (!tel) {
      showError('Số điện thoại không được để trống.');
      return;
    }

    if (!validatePhone(tel)) {
      showError('Số điện thoại không đúng định dạng.');
      return;
    }

    if (!password) {
      showError('Mật khẩu không được để trống.');
      return;
    }

    if (password.length < 6) {
      showError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password != rewritePassword) {
      showError('Nhập lại mật khẩu không đúng.');
      return;
    }

    try {
      let user = {
        user_name: userName,
        password: password,
        name: name,
        email: email,
        tel: tel,
        resort_owner: isResort
      }
      await authApi.register(user);
      // navigation.navigate(screens.SCREEN.LOGIN);
      let res = await authApi.login(user);
      dispatch(login(res.data));
      if (isResort) {
        showError('Yêu cầu cấp quyền tài khoản quản lý khu nghỉ dưỡng cần quản trị hệ thống xác nhận. Vui lòng liên hệ với bộ phận quản lý để có thể được xác nhận sớm nhất.')
      }
      navigation.navigate(screens.SCREEN.PROFILE);
    } catch (error) {
      showError('Tài khoản đã tồn tại vui lòng nhập tài khoản khác.')
    }
  }

  return (
    <Box style={styles.container}>
      <Text textAlign={"center"} marginBottom={4}></Text>
      <Input value={userName} onChangeText={text => setUserName(text)} borderRadius={8} marginBottom={2} placeholder="Nhập tài khoản"></Input>
      <Input value={name} onChangeText={text => setName(text)} borderRadius={8} marginBottom={2} placeholder="Họ và tên"></Input>
      <Input value={email} onChangeText={text => setEmail(text)} borderRadius={8} marginBottom={2} placeholder="Email"></Input>
      <Input keyboardType='numeric' value={tel} onChangeText={text => setTel(text)} borderRadius={8} marginBottom={2} placeholder="Số điện thoại"></Input>
      <Input value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} borderRadius={8} marginBottom={2} placeholder="Mật khẩu"></Input>
      <Input value={rewritePassword} onChangeText={text => setRewritePassword(text)} secureTextEntry={true} borderRadius={8} marginBottom={4} placeholder="Nhập lại mật khẩu"></Input>
      {/* {
        error && <MyAlert marginBottom={4} status="error" title={error}></MyAlert>
      } */}
      {
        error && <Text color={global.theme.COLORS.RED} marginBottom={4} status="error" title={error}>{error}</Text>
      }
      <CheckBox
        iconType="material-community"
        checkedIcon="checkbox-marked"
        title='Tài khoản quản lý khu nghỉ dưỡng'
        textStyle={styles.textCheckbox}
        containerStyle={styles.containerCheckbox}
        uncheckedIcon="checkbox-blank-outline" checked={isResort} onPress={() => { setIsResort(!isResort) }}></CheckBox>
      <Button marginTop={4} onPress={() => handleRegister()} borderRadius={8} backgroundColor={global.theme.COLORS.PRIMARY} >Đăng ký</Button>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 40,
  },
  containerCheckbox: {
    backgroundColor: global.theme.COLORS.CARD
  },
  textCheckbox: {
    // fontWeight: 500
  }
});
