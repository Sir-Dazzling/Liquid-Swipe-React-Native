import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint, useVector } from "react-native-redash";
import { Side, SliderProps } from "../interfaces";
import Button from "./Button";
import Wave, { HEIGHT, MARGIN_WIDTH, WIDTH } from "./Wave";

const PREV = WIDTH;
const NEXT = 0;
const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

const Slider: React.FC<SliderProps> = ({ children, index, setIndex, next, prev }) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const zIndex = useSharedValue(0);
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      if (x < MARGIN_WIDTH && hasPrev) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - MARGIN_WIDTH && hasNext) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({ x, y }) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = x;
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = WIDTH - x;
        right.y.value = y;
      }
    },
    onEnd: ({ x, velocityX, velocityY }) => {
      if (activeSide.value === Side.LEFT) {
        const dest = snapPoint(x, velocityX, LEFT_SNAP_POINTS);
        isTransitioningLeft.value = dest === PREV;
        left.x.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningLeft.value ? true : false,
            restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningLeft.value) {
              runOnJS(setIndex)(index - 1);
            } else {
              zIndex.value = 0;
              activeSide.value = Side.NONE;
            }
          }
        );
        left.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
      } else if (activeSide.value === Side.RIGHT) {
        const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINTS);
        isTransitioningRight.value = dest === NEXT;
        right.x.value = withSpring(
          WIDTH - dest,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningRight.value ? true : false,
            restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningRight.value) {
              runOnJS(setIndex)(index + 1);
            } else {
              activeSide.value = Side.NONE;
            }
          }
        );
        right.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
      }
    },
  });

  useEffect(() => {
    left.x.value = withSpring(MARGIN_WIDTH);
    right.x.value = withSpring(MARGIN_WIDTH);
  }, [index, left, right]);

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {children}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <Wave side={Side.LEFT} position={left} isTransitioning={isTransitioningLeft}>
              {prev}
            </Wave>
            <Button position={left} side={Side.LEFT} activeSlide={activeSide} />
          </Animated.View>
        )}
        {next && (
          <Animated.View style={StyleSheet.absoluteFill}>
            <Wave side={Side.RIGHT} position={right} isTransitioning={isTransitioningRight}>
              {next}
            </Wave>
            <Button position={right} side={Side.RIGHT} activeSlide={activeSide} />
          </Animated.View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
