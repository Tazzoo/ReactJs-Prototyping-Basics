import React from 'react';
import styled from 'styled-components';

import Filter from './Filter';

const Navbar = ({ username, filter, handleChange }) => {
    const Navbar = styled.nav`
        padding: 1rem;
        color: #fff;
    `;

    const User = styled.h3`
        margin: auto;

        @media (max-width: 770px) {
            margin: 10px auto !important;
        }
    `;

    return (
        <Navbar className='navbar bg-dark'>
            <User>Playlist de {username}</User>
            <Filter filter={filter} handleChange={handleChange} />
        </Navbar>
    );
};

export default Navbar;
