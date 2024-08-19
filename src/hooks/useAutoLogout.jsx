import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = (logout, timeout = 600000) => { // default timeout set to 10 minutes (600000 ms)
  const navigate = useNavigate();
  let logoutTimer;

  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logout();
      navigate('/login');
    }, timeout);
  };

  useEffect(() => {
    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
    
    const resetEvent = () => resetTimer();

    events.forEach(event => window.addEventListener(event, resetEvent));

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetEvent));
      clearTimeout(logoutTimer);
    };
  }, []);
};

export default useAutoLogout;
