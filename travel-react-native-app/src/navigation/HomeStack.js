import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import screens from '../resources/screens';
import SearchScreen from '../screens/Search';

const Stack = createStackNavigator();

/**
 * Config cho stack
 */
const stackOptions = {
  mode: 'card',
  headerTintColor: global.theme.COLORS.BLACK,
  headerTitleStyle: {
    
  }
}

/**
 * Config cho trang Home
 */
const homeOptions = {
  headerShown: false
}

/**
 * Config cho trang Tìm kiếm
 */
const searchOptions = {
  headerTitle: 'Tìm kiếm'
}

/**
 * Stack màn hình
 * @param {*} props 
 * @returns JSX.Element
 */
export default function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={stackOptions}
    >
      <Stack.Screen options={homeOptions} name={screens.SCREEN.HOME} component={HomeScreen} />
      <Stack.Screen options={searchOptions} name={screens.SCREEN.SEARCH} component={SearchScreen} />
    </Stack.Navigator>
  );
}