import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './assets/global.css'
import Loader from './components/Loader';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import AdminHome from './pages/Admin/AdminHome';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import Booknow from './pages/Booknow';


function App() {
  const {loading}=useSelector(state=>state.alerts)
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/admin' element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
        <Route path='/admin/buses' element={<ProtectedRoute><AdminBuses/></ProtectedRoute>}/>
        <Route path='/admin/users' element={<ProtectedRoute><AdminUsers/></ProtectedRoute>}/>
        
        
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}/>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
        <Route  path='/book-now/:id' element={<ProtectedRoute><Booknow/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;



 