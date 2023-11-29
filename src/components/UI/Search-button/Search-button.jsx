import { React, useState, useEffect } from 'react';
import './search-button.css';

function SearchButton({ children, ...props}) {

  return (
    <button className='search-button'
    {...props}
    >
      {children}
    </button>
  );
}

export default SearchButton;
