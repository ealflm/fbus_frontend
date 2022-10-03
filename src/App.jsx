import './assets/boxicons-2.0.7/css/boxicons.min.css';

// import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import MainLayout from './components/layout/MainLayout';
import { RenderRouter } from './routes/RenderRouter';
function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
