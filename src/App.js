import React, { Component } from 'react';
import Filter from './components/Filter';
import Playlists from "./components/Playlists";
import PlaylistCounter from "./components/PlaylistCounter";
import HoursCounter from "./components/HoursCounter";
import defaultStyle from './styles';
import './App.css';


const fakeServerData = {
  user: {
    name: 'David',
    playlists: {
      count: 4,
      info: [
        {
          id: 1,
          name: 'Name 1',
          songs: [
            { name: 'Song 1', duration: 1345 },
            { name: 'Song 2', duration: 1236 },
            { name: 'Song 3', duration: 7000 }
          ]
        },
        {
          id: 2,
          name: 'Name 2',
          songs: [
            { name: 'Song 3', duration: 1345 },
            { name: 'Song 4', duration: 1236 },
            { name: 'Song 5', duration: 7000 }
          ]
        },
        {
          id: 3,
          name: 'Name 3',
          songs: [
            { name: 'Song 6', duration: 1345 },
            { name: 'Song 7', duration: 1236 },
            { name: 'Song 8', duration: 7000 }
          ]
        },
        {
          id: 4,
          name: 'Name 4',
          songs: [
            { name: 'Song 9', duration: 1345 },
            { name: 'Song 10', duration: 1236 },
            { name: 'Song 11', duration: 7000 }
          ]
        },
      ]
    },
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {} }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {
          this.state.serverData.user ?
            <div>
              <h1 style={defaultStyle}>{this.state.serverData.user.name}'s Playlist</h1>
              <div>
                <PlaylistCounter playlists={this.state.serverData.user.playlists} />
                <HoursCounter playlistsInfo={this.state.serverData.user.playlists.info} />
              </div>
              <Filter />
              {
                fakeServerData.user.playlists.info.map(playlistInfo => {
                  return <Playlists key={playlistInfo.id} playlistInfo={playlistInfo} />
                })
              }
            </div> :
            <h1 style={defaultStyle}>Loading</h1>
        }
      </div>
    );
  }
}

export default App;

