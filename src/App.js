import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Search from './routes/Search';

function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/search/" element={<Search/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
