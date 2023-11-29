import { React, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
