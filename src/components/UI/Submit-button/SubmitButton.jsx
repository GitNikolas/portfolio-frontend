import React from 'react';
import './submit-button.css';

function SubmitButton({ children, ...props}) {

  return (
    <button className='submit-button'
    {...props}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
