import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://localhost:10000';
axios.defaults.validateStatus = false;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);