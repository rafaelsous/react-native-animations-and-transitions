import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";

const CIRCLE_SIZE = 100;

interface CircleProps {
  onPress: () => void;
  animatedValue: Animated.Value;
}

const Circle = ({ onPress, animatedValue }: CircleProps) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });

  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["#444", "#444", "#444", "gold", "gold"],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor: containerBg },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity {...{ onPress }}>
          <View style={[styles.circle, styles.circleButton]}>
            <Icon name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const Blowing: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });

  const [index, setIndex] = useState(0);

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <Circle {...{ onPress }} {...{ animatedValue }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  circleButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  circleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
    paddingBottom: 100,
    backgroundColor: "gold",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#444",
  },
});

export default Blowing;
