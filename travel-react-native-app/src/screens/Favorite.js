import { Box } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function FavoriteScreen({ navigation }) {
  return (
    <Box style={styles.container}>
      Favorite
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: global.theme.COLORS.WHITE,
    color: global.theme.COLORS.BLACK,
  },
});
