import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

/**
 * Stack màn hình
 * @param {*} props 
 * @returns JSX.Element
 */
export default function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}