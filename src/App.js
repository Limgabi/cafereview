import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Search from './routes/Search';
import Detail from './routes/Detail';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/place/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
