import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Side, SliderProps } from "../interfaces";
import Wave, { WIDTH } from "./Wave";

const PREV = WIDTH;
const NEXT = 0;

const Slider: React.FC<SliderProps> = ({ children, index, setIndex, next, prev }) => {
  const hasPrev = !!prev;
  const hasNext = !!next;

  return (
    <View style={StyleSheet.absoluteFill}>
      {children}
      {prev && (
        <View style={[StyleSheet.absoluteFill]}>
          <Wave side={Side.LEFT}>{prev}</Wave>
        </View>
      )}
      {next && (
        <View style={StyleSheet.absoluteFill}>
          <Wave side={Side.RIGHT}>{next}</Wave>
        </View>
      )}
    </View>
  );
};

export default Slider;
