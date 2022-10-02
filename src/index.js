import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

document.title = 'Fbus Admin';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
