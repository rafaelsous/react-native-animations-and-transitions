import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "expo-status-bar";

import LoadAssets from "./src/components/LoadAssets";
// import Transitions from "./src/screens/Transitions";
import { Blowing } from "./src/screens/Animations";
import { StyleGuide, Routes, cardAssets } from "./src/components";
import JellyScroll from "./src/screens/Animations/JellyScroll";

const fonts = {
  "SFProText-Bold": require("./src/assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./src/assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./src/assets/fonts/SF-Pro-Text-Regular.otf"),
};

const assets = [...cardAssets];

const Stack = createStackNavigator<Routes>();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: StyleGuide.palette.primary,
        borderBottomWidth: 0,
      },
      headerTintColor: "white",
    }}
  >
    {/* <Stack.Screen name="Transitions" component={Transitions} /> */}
    {/* <Stack.Screen
      name="Blowing"
      component={Blowing}
      options={{
        headerShown: false,
      }}
    /> */}

    <Stack.Screen
      name="JellyScroll"
      component={JellyScroll}
      options={{
        headerTitle: "Jelly Scroll",
        headerTitleAlign: "center",
      }}
    />
  </Stack.Navigator>
);

const App: React.FC = () => (
  <LoadAssets {...{ fonts, assets }}>
    <StatusBar style="light" translucent />
    <AppNavigator />
  </LoadAssets>
);

export default App;
