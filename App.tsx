import React from "react";
import { LogBox } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import LiquidSwipe from "./src/screens/LiquidSwipe";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const RootHOC = gestureHandlerRootHOC(() => <LiquidSwipe />);

const App = () => {
  return <RootHOC />;
};

export default App;
