// import './scss/App.scss'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//
import MainLayout from './components/Layout/MainLayout';
import { RenderRouter } from './routes/RenderRouter';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Login } from './auth/Login';
import { AuthProvider } from './auth/useAuth';
import Interceptor from './interceptor/Interceptor';
Interceptor();
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
          {RenderRouter()}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
