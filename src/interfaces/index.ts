import { ReactElement, ReactNode } from "react";
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
  children: ReactElement<SlideProps>;
  position: Vector<Animated.SharedValue<number>>;
  isTransitioning: Animated.SharedValue<boolean>;
}

export interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: ReactElement<SlideProps>;
  prev?: ReactElement<SlideProps>;
  next?: ReactElement<SlideProps>;
}

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}
