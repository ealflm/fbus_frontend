import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import { RenderRouter } from './routes/RenderRouter';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Login } from './auth/Login';
import { AuthProvider } from './auth/useAuth';
import Interceptor from './interceptor/Interceptor';
import { useEffect } from 'react';
import { onMessageListener } from './firebase';
import { ToastContainer, toast } from 'react-toastify';

Interceptor();

function App() {

  useEffect(() => {
    const intervalId = setInterval(() => {
      onMessageListener().then(payload => {
        console.log('Message received. ', payload);
        if (payload && payload.messageId) {
          toast.success(`${payload.notification.title} - ${payload.notification.body}`);
          window.dispatchEvent(
            new CustomEvent('notification', {
              detail: payload.notification
            })
          );
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <AuthProvider>
      <ToastContainer />
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
