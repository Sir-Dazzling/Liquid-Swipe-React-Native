import React from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { ButtonProps, Side } from "../interfaces";
import FeatherIcon from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("screen");
const RADIUS = 25;

const Button: React.FC<ButtonProps> = ({ activeSlide, position, side }) => {
  const isLeft = side === Side.LEFT;
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: isLeft ? position.x.value - RADIUS * 2 : width - position.x.value,
    top: position.y.value - RADIUS,
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    justifyContent: "center",
    alignItems: "center",
    opacity: withTiming(activeSlide.value === Side.NONE ? 1 : 0),
  }));

  return (
    <Animated.View style={style}>
      <FeatherIcon name={`chevron-${isLeft ? "right" : "left"}` as const} size={24} color="white" />
    </Animated.View>
  );
};

export default Button;
