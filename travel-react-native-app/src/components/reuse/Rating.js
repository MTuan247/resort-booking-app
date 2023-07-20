import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'native-base';
import { scoreDescriptor } from '../../common/function/feedback';

export default function Rating({starRating, setStarRating}) {
  const starRatingOptions = [1, 2, 3, 4, 5];

  // const [starRating, setStarRating] = useState(null);

  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>{scoreDescriptor(starRating)}</Text>
        {/* <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text> */}
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <Pressable
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => setStarRating(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialIcons
                  name={starRating >= option ? 'star' : 'star-border'}
                  size={32}
                  style={starRating >= option ? styles.starSelected : styles.starUnselected}
                />
              </Animated.View>
            </Pressable>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    // color: '#ffb300',
    color: global.theme.COLORS.PRIMARY
  },
});