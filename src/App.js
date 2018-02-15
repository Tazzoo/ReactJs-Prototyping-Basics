import React, { Component } from 'react';
import logo from './logo.svg';

import Aggregate from './components/Aggregate'
import Filter from './components/Filter'
import Playlist from "./components/Playlist";

import defaultStyle from './styles';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={defaultStyle}>Title</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;

