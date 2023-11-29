import { React, useState } from 'react';
import './burger-button.css';

function BurgerButton({ openMenu, onClick }) {

  return (
    <button
    className={`burger-button ${openMenu ? 'burger-button_oppened' : ''}`}
    onClick={onClick}
    >
    </button>
  );
}

export default BurgerButton;
