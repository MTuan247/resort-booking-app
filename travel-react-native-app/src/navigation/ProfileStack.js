import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/Profile';
import screens from '../resources/screens';

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
      <Stack.Screen name={screens.SCREEN.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}