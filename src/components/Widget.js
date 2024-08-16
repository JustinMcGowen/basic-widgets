import React from 'react';
import './Widget.css'

const Widget = ({ children, ...props }) => {

  return (
    <div className='Widget' style={{background: props.background}}>
      {children}
    </div>
  );
};

export default Widget;
