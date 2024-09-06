import React from 'react';
import {useState, useEffect, useRef} from 'react';
import './ContextMenu.css'

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

const ContextMenu = ({x, y, opened, setOpened}) => {

  // for webapp, necessary copied code is our host with query parameters of our widget class name and our settings State
  // for iframe, necessary copied code is an iframe of the above url
  // for embeddable HTML, the necessary copied code is a div with the class name, and dataset variables as our settings State


  const contextMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // const boundingBox = contextMenuRef.current.getBoundingClientRect();
      //!contextMenuRef.current.contains(event.target)
      console.log();
      if(!contextMenuRef.current.contains(event.target)){
        setOpened(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[]);

  return (
    <div className='ContextMenu' hidden={!opened} style={{left:x,top:y}} ref={contextMenuRef}>
      <section>
        <div onClick={()=>copyToClipboard('yes')}>Open Settings</div>
      </section>
      <section>
        <div onClick={()=>copyToClipboard('yes')}>Copy as Website</div>
        <div onClick={()=>copyToClipboard('yes')}>Copy as iframe</div>
        <div onClick={()=>copyToClipboard('yes')}>Copy as embedded HTML</div>
      </section>
    </div>
  );
};

export default ContextMenu;
