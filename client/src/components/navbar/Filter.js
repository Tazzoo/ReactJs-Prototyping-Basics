import React from 'react';
import styled from 'styled-components';

const Filter = ({ filter, handleChange }) => {
    const Filter = styled.div`
        
    `;

    return (
        <Filter>
            <input className='form-control mr-sm-2' type='search' placeholder='Procurar' aria-label='Search' value={filter} onChange={handleChange} />
        </Filter>
    );
};

export default Filter;
