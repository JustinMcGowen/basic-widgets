import React from 'react';
import './WaterTracker.css';
import {useState} from 'react';

const WaterTracker = ({ }) => {

  let default_sizes = [8, 16, 40];
  let units = 'oz';
  let goal = 120;

  const [consumed, setConsumed] = useState(0);

  let progress = Math.min(100,(consumed / goal * 100).toFixed(0));

  let incrementConsumed = (val) => {
    setConsumed(prevState => prevState + val)
  }


  return (
    <div className="WaterTracker">
      <h2>Water Tracker</h2>


      <div class="progress">
        <div class="percent"><span class="number">{progress}</span>%</div>
        <div class="values"><span class="number">{consumed}</span>{units} / <span class="number">{goal}</span>{units}</div>
      </div>
      <div></div>

      <div class="button-row">
        {default_sizes.map((item, i) => {
          return <button onClick={()=>incrementConsumed(item)}>{item}{units}</button>
        })}
        <button onClick={()=>setConsumed(0)}>Reset</button>
      </div>


      <div class='bottle-containter'>
        <div class='lid'></div>
        <div class='bottle' style={{'--complete':`${progress}%`}}>
          <svg class="" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <use href="duck.svg#layer1"></use>
          </svg>
          <div class='water'></div>

        </div>

      </div>



    </div>
  );
};

export default WaterTracker;
