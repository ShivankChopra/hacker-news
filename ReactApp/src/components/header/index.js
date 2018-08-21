import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className='Header'>
            <h1>Hacker News!</h1>
            <Link to='/'>home</Link>|
            <Link to='/login'>login</Link>|
            <Link to='/signup'>signup</Link>
        </div>
    );
}

export default Header;