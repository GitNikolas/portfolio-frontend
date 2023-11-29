import { React, useState } from 'react';
import './tumbler.css';

function Tumbler({ isChecked, setIsChecked }) {

  function toggleChecked() {
    setIsChecked(!isChecked);
  }

  return (
    <label>
      <input
        className='invisible-tumbler'
        type="checkbox"
        checked={isChecked}
        onChange = {toggleChecked}
      />
      <span className="visible-tumbler"></span>
    </label>

  );
}

export default Tumbler;
