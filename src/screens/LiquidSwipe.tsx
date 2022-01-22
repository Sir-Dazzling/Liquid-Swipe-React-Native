import React, { useState } from "react";
import Slide from "../components/Slide";
import Slider from "../components/Slider";
import slides from "../seeder/slides";

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];

  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]!} />
    </Slider>
  );
};

export default LiquidSwipe;
