import { useState } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text }) => {

  const springs = useSpring({
    from: {
      background: '#569AFF', y: "0%", x: "0%",
      config : {duration: 500},
    },
    to: [
      { x: "50%", background: '#569AFF' },
      { x: "100%", background: '#569AFF' },
      { x: "50%", background: '#569AFF' },
    ],
    loop: true,
  })

  return (
    <animated.div
      style={{
        width: "100%",
        height: 40,
        borderRadius: 4,
        ...springs,
      }}>{text}</animated.div>
  )
}

export default TextScroller;

// padding: '10px',
// width: '300px',
