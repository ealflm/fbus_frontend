import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import * as APIInterceptor from './interceptor/Interceptor';
import { AuthProvider } from './auth/useAuth';
import { BrowserRouter } from 'react-router-dom';

document.title = 'FBUS';
APIInterceptor.interceptor();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
