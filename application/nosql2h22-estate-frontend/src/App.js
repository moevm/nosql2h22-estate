import React from 'react'
import Cathalog from './components/pages/Cathalog.js'
import Layout from './routes/Layout.js'
import Map from './components/pages/Map.js'
import Authorization from './components/pages/Authorization.js'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="map" element={<Map/>}/>
          </Route> 
          <Route path="/authorization" element={<Authorization/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;