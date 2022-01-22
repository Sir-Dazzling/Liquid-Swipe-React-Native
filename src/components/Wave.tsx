import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { Path } from "react-native-svg";
import { WaveProps } from "../interfaces";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;

// 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
const C = 0.5522847498;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const vec2 = (x: number, y: number) => {
  "worklet";
  return { x, y };
};
const curve = (c1: Vector, c2: Vector, to: Vector) => {
  "worklet";
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

const Wave: React.FC<WaveProps> = ({ children, side }) => {
  return <View style={StyleSheet.absoluteFill}>{children}</View>;
};

export default Wave;
