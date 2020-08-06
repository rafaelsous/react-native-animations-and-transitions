import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { Card, Cards } from "../../../components";

const cards = [
  {
    type: Cards.Card1,
  },
  {
    type: Cards.Card2,
  },
  {
    type: Cards.Card3,
  },
  {
    type: Cards.Card4,
  },
  {
    type: Cards.Card5,
  },
  {
    type: Cards.Card6,
  },
];

const JellyScroll: React.FC = () => {
  return (
    <Animated.ScrollView scrollEventThrottle={1} {...{ onScroll }}>
      {cards.map(({ type }, index) => (
        <View key={index} style={[styles.card]}>
          <Card card={type} />
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    paddingTop: 40,
  },
});

export default JellyScroll;
