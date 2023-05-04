import { createStackNavigator } from '@react-navigation/stack';

import FavoriteScreen from '../screens/Favorite';
import screens from '../resources/screens';

const Stack = createStackNavigator();


/**
 * Config cho trang yêu thích
 */
const favoriteOptions = {
  headerTitle: 'Yêu thích',
}

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
        headerTintColor: global.theme.COLORS.BLACK,
        headerTitleAlign: 'center'
      }}
    >
      <Stack.Screen options={favoriteOptions} name={screens.SCREEN.FAVORITE} component={FavoriteScreen} />
    </Stack.Navigator>
  );
}