import React from 'react';
import HamburgerMenu from './components/HamburgerMenu';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import UserMenu from './components/UserMenu';
import './styles/HeaderHome.css'

const HeaderHome = () => {
  return (
    <header className="header-home">
      <HamburgerMenu />
      <Logo />
      <SearchBar />
      <UserMenu />
    </header>
  );
};

export default HeaderHome;
