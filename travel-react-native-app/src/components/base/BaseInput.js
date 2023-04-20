import { Input } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function BaseInput(props) {
  return (
    <Input 
      style={styles.input}
      {...props}
    >
      {props.children}
    </Input>
  )
}

const styles = StyleSheet.create({

});
