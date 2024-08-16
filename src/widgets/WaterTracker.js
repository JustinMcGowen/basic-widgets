import React from 'react';
import './WaterTracker.css';
import {useState} from 'react';

const WaterTracker = ({ }) => {

  let default_sizes = [8, 16, 40];
  let units = 'oz';

  const [consumed, setConsumed] = useState(0);
  const [goal, setGoal] = useState(120);

  let progress = Math.min(100,(consumed / goal * 100).toFixed(0));

  let incrementConsumed = (val) => {
    setConsumed(prevState => prevState + val)
  }


  return (
    <div className="WaterTracker">
      <h1>Water Tracker</h1>

      <button onClick={()=>incrementConsumed(10)}>Add</button>

      <div class='bottle-containter'>
        <div class='lid'></div>
        <div class='bottle' style={{'--complete':`${progress}%`}}>
          <div class='water'></div>
        </div>
      </div>

      <div>{progress}%</div>

    </div>
  );
};

export default WaterTracker;
