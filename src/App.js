import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"


import Todo from './component/Todo';
const App = () => {
  return ( 
    <Router>
  <Routes>

  <Route path="/" element={<Todo />} />
  </Routes>
</Router>

  
  );
};

export default App;
