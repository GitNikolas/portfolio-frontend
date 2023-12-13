import React from 'react';
import './more-button.css';

function MoreButton({...props}) {

  return (
    <button
    className='more-button'
    {...props}
    >
      Ещё
    </button>
  );
}

export default MoreButton;
