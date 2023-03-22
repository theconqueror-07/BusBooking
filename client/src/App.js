import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './assets/global.css'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}/>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
      </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;



 