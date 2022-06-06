import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './NavBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaTwitterSquare } from 'react-icons/fa';
import { TiSocialInstagram } from 'react-icons/ti';

function NavBar() {
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
        <button className={style.btn}><AiOutlineSearch size={21}/></button>
      </form>
      <div><span><FaTwitterSquare size={24}/></span><span><TiSocialInstagram size={24}/></span></div>
    </nav>
  );
}

export default NavBar;