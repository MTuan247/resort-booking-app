import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/Login';
import screens from '../resources/screens';

const Stack = createStackNavigator();

/**
 * option cho login
 */
const loginOptions = {
  headerShown: true,
  headerTitle: 'Đăng nhập'
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
    >
      <Stack.Screen name={screens.SCREEN.PROFILE} component={ProfileScreen} />
      <Stack.Screen options={loginOptions} name={screens.SCREEN.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}