import React from 'react';
import './LoopCounter.css'
import {useState, useEffect} from 'react';

const LoopCounter = ({ }) => {

  let colorOptions = ["#de362a","#de752a","#ded52a","#5dde2a","#2adedb","#2a39de","#8d2ade","#de2adb","#423027","#222222"]

  const [idx, setIdx] = useState(0);
  const [pattern, setPattern] = useState([[2, colorOptions[5]], [1, colorOptions[0]]]);
  const [patternCount, setPatternCount] = useState(2);

  let patternLoops = pattern.reduce((acc, [num]) => acc + num, 0);

  let tmpIdx = idx % patternLoops;
  let currentColor = idx < patternLoops * patternCount ? pattern.find(([ele]) => (tmpIdx -= ele) < 0)[1] : 'white';



  let patternNodes = []
  pattern.forEach((item, i) => {
    patternNodes.push(
      <div class='pattern-node' style={{'--node-color':item[1]}} onContextMenu={(ev) => {ev.preventDefault(); ev.stopPropagation(); setPattern(prevState=> [...prevState.slice(0, i), [item[0], colorOptions[(colorOptions.findIndex((ele) => ele == item[1])+1)%colorOptions.length]], ...prevState.slice(i+1)] )}}>
        <input class='count' type='text' value={item[0]} onChange={(ev) => {
          setPattern(prevState=> [...prevState.slice(0, i), [(parseInt(ev.target.value)||''), item[1]], ...prevState.slice(i+1)] )
        }}/>
        <input class='color' type='text' value={item[1]} onChange={(ev) => {
          setPattern(prevState=> [...prevState.slice(0, i), [item[0], ev.target.value], ...prevState.slice(i+1)] )
        }}/>
        <button onClick={()=>{setPattern(prevState=> [...prevState.slice(0, i), ...prevState.slice(i+1)])}}>-</button>
      </div>
    )
  })

  return (
    <div className="LoopCounter" style={{'--current-color':currentColor}}>
      <div class='pattern-builder'>
        {patternNodes}
      </div>
      <div class='pattern-options'>
        Repeat:
        <input type='text' value={patternCount} onChange={(ev) => setPatternCount(ev.target.value)}/>
        <button onClick={()=>{setPattern(prevState=>[...prevState, [1,colorOptions[0]]])}}>+</button>
      </div>

      <div class="display-area">
        <button onClick={() => setIdx(0)}>Reset</button>
        {idx < patternLoops * patternCount ? idx + 1 : 'DONE!'}
        <button onClick={() => {setIdx(prevState => prevState+=1)}}>Next Row</button>
      </div>
    </div>
  );
};

export default LoopCounter;
