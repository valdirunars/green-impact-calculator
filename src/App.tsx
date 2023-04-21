import React from 'react';
import logo from './img/transport.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Calculator from './Calculator';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/calculator' element={
          <>
            <Calculator />
          </>
        }/>
        <Route path="/" element={
          <>
            <Home/>
          </>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
