import { createStackNavigator } from '@react-navigation/stack';

import OrderScreen from '../screens/Order';

const Stack = createStackNavigator();

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
        headerShown: false
      }}
    >
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
    </Stack.Navigator>
  );
}