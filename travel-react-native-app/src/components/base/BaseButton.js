import { Button } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Icon } from 'native-base';

export default function BaseButton(props) {
  return (
    <Button 
      style={styles.button}
      borderRadius={25}
      height={12}
      {...props}
    >
      {props.children}
    </Button>
  )
}

const styles = StyleSheet.create({

});
