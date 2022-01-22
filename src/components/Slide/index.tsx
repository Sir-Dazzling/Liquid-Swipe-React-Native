import colorlib from "color";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { SlideProps } from "../../interfaces";
import styles from "./styles";

const { width, height } = Dimensions.get("screen");

const Slide: React.FC<SlideProps> = ({ slide: { color, description, picture, title } }) => {
  const lighterColor = colorlib(color).lighten(0.8).toString();

  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <Image source={picture} style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </>
  );
};

export default Slide;
