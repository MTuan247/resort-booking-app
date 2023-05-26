import { Alert, VStack, HStack, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function MyAlert(props) {
  return (
    <Alert w="100%" {...props}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Text fontSize="md" color={global.theme.COLORS.GRAY}>
              {props.title}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  )
}

const styles = StyleSheet.create({

});
