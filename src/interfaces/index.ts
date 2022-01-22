import { ReactNode } from "react";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

export interface ButtonProps {
  position: Vector<Animated.SharedValue<number>>;
  side: Side;
  activeSlide: Animated.SharedValue<Side>;
}

export interface WaveProps {
  side: Side;
  children: ReactNode;
}

export interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: ReactNode;
  prev?: ReactNode;
  next?: ReactNode;
}

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}
