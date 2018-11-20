import React from 'react';
import './Header.css';
import Search from './Search';
import {Link} from 'react-router-dom';
import logo from './logo.png';

const Header =()=>{
	return(
		<div className='Header'>
		<Link to="/">
		<img src={logo} alt="react coin logo" className="Header-logo"/>
		</Link>
		<Search/>
		</div>
		);
}
export default Header;