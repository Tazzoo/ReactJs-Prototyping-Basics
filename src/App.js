import React, { Component } from 'react';
import Playlist from './components/Playlist';
import Filter from './components/Filter';
import PlaylistCounter from "./components/PlaylistCounter";
import HoursCounter from "./components/HoursCounter";
import defaultStyle from './styles';
import './App.css';


const fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        id: 1,
        name: 'Name 1',
        songs: [
          { name: 'Song 1', duration: 1345 },
          { name: 'Song 2', duration: 1236 },
          { name: 'Song 3', duration: 5000 }
        ]
      },
      {
        id: 2,
        name: 'Name 2',
        songs: [
          { name: 'Song 3', duration: 1345 },
          { name: 'Song 4', duration: 1236 },
          { name: 'Song 5', duration: 6000 }
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
          { name: 'Song 11', duration: 8000 }
        ]
      }
    ],
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {}, filter: '' }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000);
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    let playlistsSelected = [];
    if (this.state.serverData.user) {
      playlistsSelected = this.state.serverData.user.playlists.filter(playlist => playlist.name.toLowerCase().includes(this.state.filter.toLowerCase()));
    }

    return (
      <div className="App">
        {
          this.state.serverData.user ?
            <div>
              <h1 style={defaultStyle}>{this.state.serverData.user.name}'s Playlist</h1>
              <PlaylistCounter playlists={playlistsSelected} />
              <HoursCounter playlists={playlistsSelected} />
              <Filter filter={this.state.filter} handleChange={this.handleChange} />
              {
                playlistsSelected.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)
              }
            </div> :
            <h1 style={defaultStyle}>Loading</h1>
        }
      </div>
    );
  }
}

export default App;

