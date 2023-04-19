import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';

import HomeStack from './HomeStack';
import ArchiveStack from './ArchiveStack';
import BookingStack from './BookingStack';
import ProfileStack from './ProfileStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Config cho bottom tab
 */
const tabConfig = {
  Home: {
    title: "Trang chủ",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'home' : 'home-outline';
      return <Icon as={Ionicons} name={iconName} size={size} color={color} />
    },
    headerShown: false
  },
  Favorite: {
    title: "Đã lưu",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'heart' : 'heart-outline';
      return <Icon as={Ionicons} name={iconName} size={size} color={color} />
    }
  },
  Booking: {
    title: "Đặt phòng",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'file-tray' : 'file-tray-outline';
      return <Icon as={Ionicons} name={iconName} size={size} color={color} />
    }
  },
  Profile: {
    title: "Tài khoản",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'person' : 'person-outline';
      return <Icon as={Ionicons} name={iconName} size={size} color={color} />
    }
  },
}

/**
 * stylesheet
 */
const styles = StyleSheet.create({
  icon: {
  }
});

/**
 * Bottom tab điều hướng màn hình
 * @returns JSX.Element
 */
function BottomTab() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="HomeStack" component={HomeStack} options={tabConfig.Home}/>
        <Tab.Screen name="ArchiveStack" component={ArchiveStack} options={tabConfig.Favorite} />
        <Tab.Screen name="BookingStack" component={BookingStack} options={tabConfig.Booking} />
        <Tab.Screen name="ProfileStack" component={ProfileStack}options={tabConfig.Profile} />
    </Tab.Navigator>
  )
}

/**
 * Điều hướng
 * @param {*} props 
 * @returns JSX.Element
 */
export default function Navigation(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false
      }}
    >
      <Stack.Screen name="App" component={BottomTab} />
    </Stack.Navigator>
  );
}