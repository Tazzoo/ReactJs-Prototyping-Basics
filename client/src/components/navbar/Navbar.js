import React from 'react';
import Filter from './Filter';

const Navbar = ({ username, filter, handleChange }) => {
    return (
        <nav className='navbar bg-dark' style={{ padding: '1rem', color: '#FFF' }}>
            <h3 className='rl-title' style={{ margin: 'auto' }}>
                Playlist de {username}
            </h3>
            <Filter filter={filter} handleChange={handleChange} />
        </nav>
    );
};

export default Navbar;
