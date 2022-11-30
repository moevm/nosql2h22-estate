import React from 'react'
import Cathalog from './components/pages/Cathalog.js'
import Layout from './routes/Layout.js'
import Map from './components/pages/Map.js'
import Statistics from './components/pages/Statistics.js'
import Authorization from './components/pages/Authorization.js'
import {
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Cathalog/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/stat" element={<Statistics/>}/>
        </Route> 
        <Route path="/authorization" element={<Authorization/>}/>
      </Routes>
    </div>
  );
}

export default App;
