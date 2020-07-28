import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

const CIRCLE_SIZE = 100;
const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;
const { width } = Dimensions.get("window");

interface CircleProps {
  index: number;
  quotes: { quote: string; author: string }[];
  animatedValue: Animated.Value;
  animatedValue2: Animated.Value;
  onPress: () => void;
}

const quotes = [
  {
    quote:
      "For the things we have to learn before we can do them, we learn by doing them.",
    author: "Aristotle, The Nicomachean Ethics",
  },
  {
    quote: "The fastest way to build an app.",
    author: "The Expo Team",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: "Steve Jobs",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  // {
  //   quote:
  //     "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
  //   author: "Oprah Winfrey",
  // },
  // {
  //   quote:
  //     "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
  //   author: "James Cameron",
  // },
  // {
  //   quote: "Life is what happens when you're busy making other plans.",
  //   author: "John Lennon",
  // },
];

const colors = [
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "#222",
  },
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "yellowgreen",
  },
  {
    initialBgColor: "#222",
    bgColor: "yellowgreen",
    nextBgColor: "midnightblue",
  },
  {
    initialBgColor: "yellowgreen",
    bgColor: "midnightblue",
    nextBgColor: "turquoise",
  },
  {
    initialBgColor: "midnightblue",
    bgColor: "turquoise",
    nextBgColor: "goldenrod",
  },
  {
    initialBgColor: "turquoise",
    bgColor: "goldenrod",
    nextBgColor: "#222",
  },
];

const Circle = ({
  index,
  animatedValue,
  animatedValue2,
  onPress,
}: CircleProps) => {
  const { initialBgColor, bgColor, nextBgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });

  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              {
                perspective: 200,
              },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },
              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity {...{ onPress }}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ["0deg", "180deg", "180deg", "180deg"],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedIcon name="right" size={20} color={"white"} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const Blowing: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(quotes.length).keys()];
  const [index, setIndex] = useState(0);

  const animation = (i: number) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);

    animation((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <Circle
        {...{ index }}
        {...{ quotes }}
        {...{ animatedValue }}
        {...{ animatedValue2 }}
        {...{ onPress }}
      />

      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: quotes.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
              (i) => i / 2
            ),
            outputRange: [...Array(quotes.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0
            ),
          }),
        }}
      >
        {quotes.slice(0, colors.length).map(({ quote, author }, i) => {
          return (
            <View style={{ paddingRight: width, width: width * 2 }} key={i}>
              <Text
                style={[styles.paragraph, { color: colors[i].nextBgColor }]}
              >
                {quote}
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  {
                    color: colors[i].nextBgColor,
                    fontSize: 10,
                    fontWeight: "normal",
                    textAlign: "right",
                    opacity: 0.8,
                  },
                ]}
              >
                ______ {author}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  circleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  button: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "turquoise",
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto",
    color: "white",
  },
});

export default Blowing;
