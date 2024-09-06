import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Widget from './components/Widget'

import WaterTracker from './widgets/WaterTracker';
import LavaLamp from './widgets/LavaLamp';
import LoopCounter from './widgets/LoopCounter';


const widgets = [
  {
    'name': 'Water Tracker',
    'className': 'water-tracker',
    'type': WaterTracker
  },
  {
    'name': 'Lava Lamp',
    'className': 'lava-lamp',
    'type': LavaLamp
  },
  {
    'name': 'Loop Counter',
    'className': 'loop-counter',
    'type': LoopCounter
  }
]

function loadDivWidget( container, type ){
  let root = ReactDOM.createRoot( container );
  root.render(
    <Widget type={type} {...container.dataset} />
  )
}


function addDivForIframe(type, params){
  var iframeDiv = document.createElement('div');
  iframeDiv.className = type;

  //if we are an iframe, take query parameters and add them as data attributes to the new div. This is how savable params will get read by widget
  iframeDiv.dataset['is_iframe'] = true;
  params.forEach((item, key) => {
    if(!['widget'].includes(key)){
      iframeDiv.dataset[key] = item;
    }
  });

  document.getElementsByTagName('body')[0].appendChild(iframeDiv);
}


function loadWidgets(){
  let params = new URLSearchParams(window.location.search)
  let addWidget = params.has('widget') ? params.get('widget') : '';

  if(addWidget){
    addDivForIframe(addWidget, params)
  }

  widgets.forEach((widgetType, i) => {

    // appends div to body if we have the query parameter of "widget" set - this is when the widget is loaded through an iframe
    let widgetDivs = document.querySelectorAll(`.${widgetType['className']}`);
    widgetDivs.forEach(div => {
      loadDivWidget( div, widgetType['type'] )
    });
  });
}

document.addEventListener('readystatechange', function() {
  if (document.readyState === 'complete') {
    loadWidgets();
  }
});






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
