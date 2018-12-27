import React from 'react';
import styled from 'styled-components';
import sizes from 'client_config/screenSize';

const Filter = ({ filter, handleChange }) => {
    const Filter = styled.div`
        @media (max-width: ${sizes.tablet}) {
            margin: 0 auto;
        }
    `;

    return (
        <Filter>
            <input className='form-control mr-sm-2' type='search' placeholder='Procurar' aria-label='Search' value={filter} onChange={handleChange} />
        </Filter>
    );
};

export default Filter;
