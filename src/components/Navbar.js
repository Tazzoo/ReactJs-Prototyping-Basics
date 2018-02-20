import React from "react";
import Filter from './Filter';

const Navbar = (props) => (
  <nav className='navbar bg-dark' style={{ padding: '1rem', color: '#FFF' }}>
    <h3 className='rl-title' style={{ margin: 'auto' }}>Playlist de {props.username}</h3>
    <Filter value={props.filter} handleChange={props.handleChange} />
  </nav>
)


export default Navbar;