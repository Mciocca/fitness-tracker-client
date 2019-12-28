import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Store from './store/store';
import { Provider } from 'react-redux';
import Request from './utils/request';

Request.get('/api/v1').then((config) => {
  ReactDOM.render(
    <BrowserRouter>
     <Provider store={Store}>
       <App config={config} />
     </Provider>
    </BrowserRouter>,
  document.getElementById('root'));
}).catch(() => {
  ReactDOM.render(
    <div>
      <h1>App failed to load, please refresh page to try again</h1>
    </div>,
  document.getElementById('root'));
})

