import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './NavBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';

function NavBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const onChange = (e) => {
    setSearchWord(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/search', {
      state: {
        searchWord: searchWord,
      }
    });
    setSearchWord('');
  }
  return (
    <nav className={style.container}>
      <div><h1><Link to="/" style={{ textDecoration: 'none', color: "black" }}>yirgacheffe</Link></h1></div>
      <form className='search' onSubmit={onSubmit}>
        <input
          className={style.searchBar}
          value={searchWord}
          onChange={onChange}
          placeholder='search the place!'
        />
        <button className={style.btn}><AiOutlineSearch size={21} /></button>
      </form>
      <div>
        {isLoggedIn ? (
          <Link to="/profile" style={{ color: "black" }}>
            <span><MdAccountCircle size={24} /></span>
          </Link>
        ) : (
          <Link to="/auth" style={{ color: "black" }}>
            <span><MdAccountCircle size={24} /></span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;