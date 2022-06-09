import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Search from '../routes/Search';
import Detail from '../routes/Detail';
import Profile from '../routes/Profile';

function AppRouter({ isLoggedIn }) {
  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/" element={<Profile />}/>
        <Route path="/auth/" element={<Auth/>}/>
        <Route path="/search/" element={<Search />} />
        <Route path="/place/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
