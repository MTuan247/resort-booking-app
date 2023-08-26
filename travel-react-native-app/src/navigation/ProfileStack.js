import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/Login';
import screens from '../resources/screens';
import RegisterScreen from '../screens/Register';

const Stack = createStackNavigator();

/**
 * option cho login
 */
const loginOptions = {
  headerShown: true,
  headerTitle: 'Đăng nhập'
}

/**
 * option cho register
 */
const registerOptions = {
  headerShown: true,
  headerTitle: 'Đăng ký'
}

/**
 * Stack màn hình
 * @param {*} props 
 * @returns JSX.Element
 */
export default function ProfileStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
        headerTitleAlign: 'center',
        headerTintColor: global.theme.COLORS.BLACK,
      }}
      initialRouteName={screens.SCREEN.PROFILE}
    >
      <Stack.Screen name={screens.SCREEN.PROFILE} component={ProfileScreen} />
      <Stack.Screen options={loginOptions} name={screens.SCREEN.LOGIN} component={LoginScreen} />
      <Stack.Screen options={registerOptions} name={screens.SCREEN.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}