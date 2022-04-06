import './App.css';
import React from 'react';
import NotFound from './components/NotFound';
import Wireframe from './components/Wireframe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


function App() {
  
  return (
    <React.Fragment>
    <NavBar />
    <Router>
      <Routes>
        <Route path="/wireframe" element={<Wireframe />} />
        <Route path="/" element={<Wireframe replace to="/wireframe" />} />
        <Route path="/*" component={NotFound} />
      </Routes>
    </Router>
    <Footer />
  </React.Fragment>
  );
}

export default App;
