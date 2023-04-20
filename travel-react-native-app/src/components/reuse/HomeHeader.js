import { Box, Avatar, Heading } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Icon } from 'native-base';

export default function HomeHeader({ navigation }) {
  return (
    <Box style={styles.header}>
      <Avatar size={10} source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}>
        AJ
      </Avatar>
      <Heading style={styles.title}>Trang chủ</Heading>
      <Box size={10} style={styles.notification}>
        <Box style={styles.notificationActive}></Box>
        <Icon as={Ionicons} name="notifications-outline" size={6} color={global.theme.BLACK} />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    flex: 1,
    textAlign: 'center',
    fontFamily: global.theme.FONTS.SEMIBOLD
  },
  notification: {
    backgroundColor: global.theme.COLORS.WHITE,
    alignItems: 'center',
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center',
    elevation: 20,
    shadowColor: global.theme.COLORS.PRIMARY,
    position: 'relative',
  },
  notificationActive: {
    position: 'absolute',
    backgroundColor: global.theme.COLORS.EMERALD,
    right: '25%',
    top: '20%',
    height: 8,
    aspectRatio: 1,
    borderRadius: 25,
    zIndex: 1
  }
});
