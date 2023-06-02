import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import screens from '../resources/screens';
import SearchScreen from '../screens/Search';
import { Icon, Pressable } from 'native-base';
import { Ionicons } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { toggleSearch } from '../redux/reducer/searchReducer.js'

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
  headerTitle: 'Tìm kiếm',
  headerTitleAlign: 'center',
  headerRight: (props) => <SearchButton />,
}

/**
 * 
 * @returns Nút tìm kiếm
 */
const SearchButton = () => {

  const dispatch = useDispatch();

  const searchState = useSelector((state) => state.search);

  const toggleSearchBar = () => {
    dispatch(toggleSearch());
  }

  return (
    <Pressable onPress={toggleSearchBar}>
      {
        searchState.showOnSearch ? (
          <Icon as={Ionicons} color={global.theme.COLORS.BLACK} marginRight={3} size={8} name='close-outline' />
        ) : (
          <Icon as={Ionicons} color={global.theme.COLORS.BLACK} marginRight={3} size={6} name='search-outline' />
        )
      }
    </Pressable>
  )
}

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
    </Stack.Navigator>
  );
}