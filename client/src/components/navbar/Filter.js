import React from 'react';

const Filter = ({ filter, handleChange }) => (
  <div className='rl-filter'>
    <input
      className='form-control mr-sm-2'
      type='search'
      placeholder='Procurar'
      aria-label='Search'
      value={filter}
      onChange={handleChange}
    />
  </div>
);

export default Filter;
