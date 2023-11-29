import {React, useContext} from 'react';
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

function ProtectedRoute ({ component: Component, isAuthorized,  ...props }) {

  const { dataIsReady } = useContext(CurrentUserContext);

  return (
    dataIsReady ? (isAuthorized ? <Component {...props} /> : <Navigate to="/" replace />) : < Preloader />
  )
}

export default ProtectedRoute;
