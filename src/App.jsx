// import './scss/App.scss'
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//
import MainLayout from './components/layout/MainLayout';
import { RenderRouter } from './routes/RenderRouter';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Login } from './auth/Login';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<MainLayout />}>
        {/* <Route index element={<Dashboard />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="drivers" element={<Drivers />} />
                    <Route path="buses" element={<Buses />} />
                    <Route path="trips" element={<Trips />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="discount" element={<Blank />} />
                    <Route path="inventory" element={<Blank />} />
                    <Route path="settings" element={<Blank />} />
                    <Route path='createdriver' element={<Createdriver/>}/>
                    <Route path='createbus' element={<Createbus />}/> */}
        {RenderRouter()}
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
