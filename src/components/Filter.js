import React from 'react';

const Filter = (props) => (
  <div>
    <img alt="" />
    <input type="text" value={props.filter} onChange={props.handleChange} />
  </div>
);

export default Filter