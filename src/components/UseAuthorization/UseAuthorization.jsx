import { React, useState, useEffect, useCallback } from "react";
import { getUser } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';

export function useAuthorization() {
  const [isAuthorized, setisAuthorized] = useState(false);
  const [ dataIsReady, setdataIsReady ] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  async function checkToken() {
    try {
      const user = await getUser();
      if(user.ok) {
        const userData = await user.json();
        setCurrentUser(userData);
        setisAuthorized(true);
      }
      else {
        setisAuthorized(false);
      }
    }
    catch(err) {
      console.error(err);
    }
    finally{
      setdataIsReady(true);
    }
  }

  function logout() {
    setisAuthorized(false);
    localStorage.clear();
    setCurrentUser(null);
    navigate('/');
  }

  useEffect(() => {
    checkToken();
  }, []);

  return { isAuthorized, dataIsReady, currentUser, setCurrentUser, checkToken, logout };
}
