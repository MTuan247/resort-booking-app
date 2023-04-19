import { Box } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <Box style={styles.container}>
      Profile
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.theme.COLORS.WHITE,
    color: global.theme.COLORS.BLACK,
  },
});
