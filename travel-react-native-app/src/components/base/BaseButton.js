import { Button } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function BaseButton(props) {
  return (
    <Button 
      style={styles.button}
      borderRadius={25}
      height={12}
      backgroundColor={theme.COLORS.PRIMARY}
      {...props}
    >
    </Button>
  )
}

const styles = StyleSheet.create({

});
