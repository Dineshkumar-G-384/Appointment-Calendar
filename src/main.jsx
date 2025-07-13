import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Login.jsx'
import Appointments from './Appointment.jsx';
import Calendar from 'react-calendar';

const route=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/appointments',
    element:<Appointments/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
