import React, { useState } from "react";
import './InfoTooltip.css';

const InfoTooltip = ({ serverError, setServerError }) => {

  const [ isOpen, setisOpen ] = React.useState(false);

  function onClose(){
    setisOpen(false);
    setServerError('');
  }

  useState(() => {
    if(serverError !== '') {
      setisOpen(true);
    }
  }, [serverError])

  return (
    <div className={`popup ${isOpen ? `popup_open` : ''}`}>
      <div className="popup__overlay" onClick={onClose}>
        <div className="popup__content">
          <button type="button" className="popup__close" onClick={onClose} />
          <p
          className="popup__title"
          >{serverError}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
