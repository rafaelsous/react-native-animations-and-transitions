import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import StyleGuide from "../StyleGuide";
import Text from "../Text";

interface Props {
  label: string;
  primary?: boolean;
  onPress: () => void;
}

const Button: React.FC<Props> = ({ label, primary, onPress }) => {
  const color = primary ? "white" : undefined;
  const backgroundColor = primary ? StyleGuide.palette.primary : undefined;

  return (
    <RectButton {...{ onPress }}>
      <SafeAreaView style={{ backgroundColor }} accessible>
        <View style={styles.container}>
          <Text type="headline" style={[styles.label, { color }]}>
            {label}
          </Text>
        </View>
      </SafeAreaView>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: StyleGuide.spacing * 2,
  },
  label: {
    textAlign: "center",
  },
});

export default Button;
