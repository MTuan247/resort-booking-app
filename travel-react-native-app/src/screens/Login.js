import { Avatar, Box, HStack, Alert, VStack, Text, Pressable, Icon, FormControl, Input, Button } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MyAlert from '../components/alert/MyAlert';
import { login } from '../redux/reducer/contextReducer';
import screens from '../resources/screens';
import { useNavigation } from '@react-navigation/native';
import authApi from '../common/api/auth';

export default function LoginScreen() {

  const contextState = useSelector((state) => state.context);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!userName) {
      setError('Tên tài khoản không được để trống');
      return;
    }

    if (!password) {
      setError('Mật khẩu không được để trống');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    try {
      let user = {
        user_name: userName,
        password: password
      }
      let res = await authApi.login(user)
      dispatch(login(res.data));
      navigation.navigate(screens.SCREEN.PROFILE);
    } catch (error) {
      setError('Tài khoản hoặc mật khẩu không đúng')
    }
  }

  return (
    <Box style={styles.container}>
      <Text textAlign={"center"} marginBottom={4}></Text>
      <Input value={userName} onChangeText={text => setUserName(text)} borderRadius={8} marginBottom={2} placeholder="Nhập tài khoản"></Input>
      <Input value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} borderRadius={8} marginBottom={4} placeholder="Mật khẩu"></Input>
      {
        error && <MyAlert marginBottom={4} status="error" title={error}></MyAlert>
      }
      <Button onPress={() => handleLogin()} borderRadius={8} backgroundColor={global.theme.COLORS.PRIMARY} >Đăng nhập</Button>
      <Pressable marginTop={8}>
        <Text textAlign={"center"} color={global.theme.COLORS.BLUE}>Quên mật khẩu</Text>
      </Pressable>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 40,
  },
});
