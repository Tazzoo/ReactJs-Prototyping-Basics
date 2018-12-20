import React from 'react';

const Filter = props => (
  <div className='rl-filter'>
    <input
      className='form-control mr-sm-2'
      type='search'
      placeholder='Procurar'
      aria-label='Search'
      value={props.filter}
      onChange={props.handleChange}
    />
  </div>
);

export default Filter;
