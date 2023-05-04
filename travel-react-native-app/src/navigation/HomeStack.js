import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import screens from '../resources/screens';
import SearchScreen from '../screens/Search';
import ResortScreen from '../screens/Resort';

const Stack = createStackNavigator();

/**
 * Config cho stack
 */
const stackOptions = {
  mode: 'card',
  headerTintColor: global.theme.COLORS.BLACK,
  headerTitleStyle: {
    
  },
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
 * Config cho trang chi tiết
 */
// const detailOptions = ({ route }) => ({
//   headerTitle: route.params.item.title,
//   headerTransparent: true,
//   headerTintColor: global.theme.COLORS.WHITE,
//   headerStyle: {
//     backgroundColor: global.theme.COLORS.DARKGRAY,
//   },
// })

/**
 * Stack màn hình
 * @param {*} props 
 * @returns JSX.Element
 */
export default function HomeStack({ navigation, route }) {

  return (
    <Stack.Navigator
      screenOptions={stackOptions}
    >
      <Stack.Screen options={homeOptions} name={screens.SCREEN.HOME} component={HomeScreen} />
      <Stack.Screen options={searchOptions} name={screens.SCREEN.SEARCH} component={SearchScreen} />
      {/* <Stack.Screen options={detailOptions} name={screens.SCREEN.RESORT} component={ResortScreen} /> */}
    </Stack.Navigator>
  );
}