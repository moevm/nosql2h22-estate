import React, { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom";

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
/*
  const updateIsAuthorized = (val) => {
    setIsLoggedIn(val)
  }
*/  
/*
  const updateToken = (val) => {
    console.log('val = ', val)
    setToken(val)
  }
*/
/*
  const logOut = () => {
    localStorage.setItem('isAuthorized', false)
    setIsLoggedIn('false')
    setToken('')
  }
*/
  const adminProfileRoute = () => {
    if(isLoggedIn === 'true'){
      return <Route path="/adminProfile" element={<AdminProfile/>}/>
    }else{
      return <></>
    }
  }
/*
  const updateToken = (val) => {
    console.log('val = ', val)
    setToken(val)
  }

  const updateAuthorization = (val) => {
    setIsLoggedIn(val)
  }
*/
  const logOut = () => {
    localStorage.setItem('isAuthorized', false)
    localStorage.removeItem('token')
    setIsLoggedIn('false')
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout handleAdminExit={logOut} isAuthorized={isLoggedIn}/>}>
            <Route path="/" element={<Cathalog isAuthorized={isLoggedIn}/>}/>
            <Route path="/map" element={<Map isAuthorized={isLoggedIn}/>}/>
            <Route path="/stat" element={<Statistics isAuthorized={isLoggedIn}/>}/>
            { adminProfileRoute() }
            <Route path="/testHouseProfile" element={<HouseProfile/>}/>
            <Route path='/map/:id' element={<HouseProfile/>}/>
          </Route> 
          <Route path="/auth" element={<Authorization setIsAuthorized={(v) => setIsLoggedIn(v)} isAuthorized={isLoggedIn}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
