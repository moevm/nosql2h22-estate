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

  const logOut = () => {
    localStorage.setItem('isAuthorized', false)
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout handleAdminExit={logOut} isAuthorized={isLoggedIn}/>}>
          <Route path="/" element={<Cathalog isAuthorized={isLoggedIn}/>}/>
          <Route path="/map" element={<Map isAuthorized={isLoggedIn}/>}/>
          <Route path="/stat" element={<Statistics isAuthorized={isLoggedIn}/>}/>
          <Route path="/testAdminProfile" element={<AdminProfile/>}/>
          <Route path="/testHouseProfile" element={<HouseProfile/>}/>
        </Route> 
        <Route path="/auth" element={<Authorization setIsAuthorized={setIsLoggedIn} setToken={setToken} isAuthorized={isLoggedIn}/>}/>
      </Routes>
    </div>
  );
}

export default App;
