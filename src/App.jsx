import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import { RenderRouter } from './routes/RenderRouter';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Login } from './auth/Login';
import { AuthProvider } from './auth/useAuth';
import Interceptor from './interceptor/Interceptor';
import { useEffect } from 'react';
import { onMessageListener } from './firebase';

Interceptor();

function App() {

  useEffect(() => {
    const intervalId = setInterval(() => {
      onMessageListener().then(data => {
        console.log('Message received. ', data);
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

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
