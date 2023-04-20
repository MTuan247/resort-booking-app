import { createStackNavigator } from '@react-navigation/stack';

import FavoriteScreen from '../screens/Favorite';
import screens from '../resources/screens';

const Stack = createStackNavigator();

/**
 * Stack màn hình
 * @param {*} props 
 * @returns JSX.Element
 */
export default function ArchiveStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false
      }}
    >
      <Stack.Screen name={screens.SCREEN.FAVOURITE} component={FavoriteScreen} />
    </Stack.Navigator>
  );
}