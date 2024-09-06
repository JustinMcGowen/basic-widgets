import React from 'react';
import {useState, useEffect} from 'react';
import './Widget.css'


import ContextMenu from '../composites/ContextMenu';


function updateProps(newParams, setSettings, isIframe){

  setSettings((prevState)=>{return{...prevState, ...newParams}})

  if(isIframe){
    let newQueryParameters = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(newParams)) {
      newQueryParameters.set(key,  value)
    }
    window.history.pushState(null, '', `?${newQueryParameters.toString()}`);
  }
}


const Widget = ({ type, ...props }) => {

  // this widget wrapper is a set of properties that wraps a functional component and handles getting and setting logic of those properties
  // we can then copy out the properties in either html or a url+query so that the widget can be embedded anywhere

  // for webapp, necessary copied code is our host with query parameters of our widget class name and our settings State
  // for iframe, necessary copied code is an iframe of the above url
  // for embeddable HTML, the necessary copied code is a div with the class name, and dataset variables as our settings State

  //this is a const becaus it shouldn't change for the life of the widget
  const isIframe = JSON.parse(props['is_iframe']||false);

  const [settings, setSettings] = useState(props);
  const [availableSettings, setAvailableSettings] = useState({background:'color'});

  // settings page

  // context menu
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuLocation, setMenuLocation] = useState([0,0]);

  function openMenu(ev){
    setMenuOpened(true);
    setMenuLocation([ev.pageX,ev.pageY]);
  }

  const myContextMenu = <ContextMenu x={menuLocation[0]} y={menuLocation[1]} opened={menuOpened} setOpened={(val)=>setMenuOpened(val)}/>





  //widget
  let widget = React.createElement(type, props);

  useEffect(() => {
    //example of changing widget's background color
    // updateProps({background:'blue'}, setSettings, isIframe)
    let widget = React.createElement(type, settings)
  }, [settings]);


  // example of changing widget's background color
  // useEffect(() => {
  //   updateProps({background:'blue'}, setSettings, isIframe)
  // }, [type]);



  return (
    <div className='Widget' style={{background: settings.background}} onContextMenu={(event)=>{event.preventDefault();openMenu(event);}}>
      { widget }
      { myContextMenu }

    </div>
  );
};

export default Widget;
