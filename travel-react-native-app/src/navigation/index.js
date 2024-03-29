import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { Icon } from 'native-base';
import { StyleSheet } from 'react-native';

import HomeStack from './HomeStack';
import ArchiveStack from './ArchiveStack';
import BookingStack from './BookingStack';
import ProfileStack from './ProfileStack';
import screens from '../resources/screens';

import ResortScreen from '../screens/Resort';
import DetailScreen from '../screens/Detail';
import ImageArticle from '../screens/ImageArticle';
import PaymentScreen from '../screens/Payment';
import CommentScreen from '../screens/Comment';
import FeedbackScreen from '../screens/Feedback';

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
    },
    headerShown: false
  },
  Booking: {
    title: "Đặt phòng",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'file-tray' : 'file-tray-outline';
      return <Icon as={Ionicons} name={iconName} size={size} color={color} />
    },
    headerShown: false
  },
  Profile: {
    title: "Tài khoản",
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = focused ? 'person' : 'person-outline';
      return <Icon as={Ionicons} name={iconName} size={size} color={color} />
    },
    headerShown: false
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
        <Tab.Screen name={screens.STACKS.HOME} component={HomeStack} options={tabConfig.Home}/>
        <Tab.Screen name={screens.STACKS.ARCHIVE} component={ArchiveStack} options={tabConfig.Favorite} />
        <Tab.Screen name={screens.STACKS.BOOKING} component={BookingStack} options={tabConfig.Booking} />
        <Tab.Screen name={screens.STACKS.PROFILE} component={ProfileStack} options={tabConfig.Profile} />
    </Tab.Navigator>
  )
}

/**
 * Config cho trang chi tiết
 */
const resortOptions = ({ route }) => ({
  headerTitle: route.params.title || 'Tìm kiếm',
  headerTransparent: true,
  headerTintColor: global.theme.COLORS.WHITE,
  headerStyle: {
    backgroundColor: global.theme.COLORS.DARKGRAY,
  },
  headerShown: true,
});

/**
 * Config cho trang chi tiết
 */
const detailOptions = ({ route }) => ({
  headerTitle: route.params.title,
  headerTransparent: true,
  headerTintColor: global.theme.COLORS.WHITE,
  headerStyle: {
    backgroundColor: global.theme.COLORS.DARKGRAY,
  },
  headerShown: true,
})

/**
 * Config cho trang đặt phòng
 */
const paymentOptions = ({ route }) => ({
  headerTitle: 'Đặt phòng',
  headerTintColor: global.theme.COLORS.BLACK,
  headerStyle: {
  },
  headerShown: true,
  headerTitleAlign: 'center'
})

/**
 * Config cho trang comment
 */
const commentOptions = ({ route }) => ({
  headerTitle: 'Đánh giá',
  headerTintColor: global.theme.COLORS.BLACK,
  headerStyle: {
  },
  headerShown: true,
  headerTitleAlign: 'center'
});

/**
 * Config cho trang default
 */
const defaultOptions = ({ route }) => ({
  headerTitle: route.params?.title,
  headerTintColor: global.theme.COLORS.BLACK,
  headerStyle: {
  },
  headerShown: true,
  headerTitleAlign: 'center'
});

/**
 * Config cho trang Viết đánh giá 
 */
const feedbackOptions = ({ route }) => {
  return {
    ...defaultOptions({ route }),
    headerTitle: 'Viết đánh giá'
  }
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
      <Stack.Screen name={screens.SCREEN.IMAGE} component={ImageArticle} />
      <Stack.Screen options={resortOptions} name={screens.SCREEN.RESORT} component={ResortScreen} />
      <Stack.Screen options={detailOptions} name={screens.SCREEN.DETAIL} component={DetailScreen} />
      <Stack.Screen options={paymentOptions} name={screens.SCREEN.PAYMENT} component={PaymentScreen} />
      <Stack.Screen options={commentOptions} name={screens.SCREEN.COMMENT} component={CommentScreen} />
      <Stack.Screen options={feedbackOptions} name={screens.SCREEN.FEEDBACK} component={FeedbackScreen} />
    </Stack.Navigator>
  );
}