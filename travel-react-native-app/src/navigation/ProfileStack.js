import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator();

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
        headerShown: false
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}