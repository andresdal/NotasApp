import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Nota from './views/Nota';
//import CrearNota from './views/CrearNota'; // Asegúrate de crear este componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nota/:id" element={<Nota />} />
      </Routes>
    </Router>
  );
};

export default App;