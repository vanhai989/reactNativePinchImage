import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';

export default function App() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GestureHandlerRootView style={{width: 500, height: 500, zIndex: 2, justifyContent: 'center', alignItems: 'center'  }}>
    <GestureDetector gesture={pinchGesture}>
      <Animated.Image source={require('./image.jpeg')} style={[styles.box, animatedStyle]} />
    </GestureDetector>
    </GestureHandlerRootView>
    <Text style={{zIndex: 1}}>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 220,
    width: 220,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
    zIndex: 2
  },
});
