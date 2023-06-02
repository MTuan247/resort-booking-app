import { createStackNavigator } from '@react-navigation/stack';

import OrderScreen from '../screens/Order';
import screens from '../resources/screens';

const Stack = createStackNavigator();

/**
 * Config cho trang yêu thích
 */
const orderOptions = {
  headerTitle: 'Đặt phòng'
}

/**
 * Stack màn hình
 * @param {*} props 
 * @returns JSX.Element
 */
export default function BookingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerTintColor: global.theme.COLORS.BLACK,
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen options={orderOptions} name={screens.SCREEN.ORDER} component={OrderScreen} />
    </Stack.Navigator>
  );
}