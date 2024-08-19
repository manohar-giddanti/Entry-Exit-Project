import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './components/main' ;  
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';  
import 'bootstrap/dist/css/bootstrap.min.css';
 

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode> 
);     
           

         

  
 