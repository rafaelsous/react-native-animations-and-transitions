import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useTransition, mix, transformOrigin } from "react-native-redash";

import { Button, StyleGuide, cards, Card, CARD_WIDTH } from "../../components";

const alpha = Math.PI / 6;

const UseTransition: React.FC = () => {
  const [toggled, setToggled] = useState(false);
  const transition = useTransition(toggled, { duration: 400 });

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => {
        const rotate = mix(transition, 0, (index - 1) * alpha);

        return (
          <Animated.View
            key={card}
            style={[
              styles.overlay,
              {
                transform: transformOrigin(
                  { x: -CARD_WIDTH / 2, y: 0 },
                  { rotate }
                ),
              },
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}

      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggled(!toggled)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: StyleGuide.spacing * 4,
  },
});

export default UseTransition;
