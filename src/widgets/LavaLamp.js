import React from 'react';
import './LavaLamp.css'

const LavaLamp = ({ ...props }) => {

  let bubbles = [];

  for(let i=0; i < 20; i++){

    const speed = Math.random() * 5 + 10;
    const animationOffset = Math.random() * (-20);
    const size = Math.random() * (5) + 5;

    let bubble = <div class="Bubble" style={{
      'top':`${i*5}%`,
      'left':`${i*2+30}%`,
      '--animation-time':`${speed}s`,
      '--animation-offset':`${animationOffset}s`,
      '--size':`${size}%`
    }}></div>;

  	bubbles.push(bubble);
  }

  return (
    <div className="LavaLamp" style={{'--color': props.lamp_color}}>
      <div class="Outline">
        <div class="Lamp">
          {bubbles}
        </div>
        <div class="Top"></div>
        <div class="Base"></div>
      </div>
    </div>
  );
};

export default LavaLamp;
