import React, { useState } from 'react'
import Cathalog from './components/pages/Cathalog.js'
import Layout from './routes/Layout.js'
import Map from './components/pages/Map.js'
import Statistics from './components/pages/Statistics.js'
import Authorization from './components/pages/Authorization.js'
import AdminProfile from './components/pages/AdminProfile.js'
import {
  Routes,
  Route
} from "react-router-dom";
import HouseProfile from "./components/pages/HouseProfile";


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAuthorized'))
  const [token, setToken] = useState('')

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Cathalog/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/stat" element={<Statistics/>}/>
          <Route path="/testAdminProfile" element={<AdminProfile/>}/>
          <Route path='/house_idtest/' element={<HouseProfile/>}/>
          <Route path='/map/:id' element={<HouseProfile/>}/>
        </Route> 
        <Route path="/authorization" element={<Authorization setIsAuthorized={setIsLoggedIn} setToken={setToken}/>}/>
      </Routes>
    </div>
  );
}

export default App;
