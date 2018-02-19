import React, { Component } from 'react';
import Playlist from './components/Playlist';
import Filter from './components/Filter';
import PlaylistCounter from "./components/PlaylistCounter";
import HoursCounter from "./components/HoursCounter";
import defaultStyle from './styles';
import queryString from "querystring";
import axios from "axios";
import _ from "lodash";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { user: { name: '' }, playlists: [], filter: '' }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // Fetch Name
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed['?access_token'];
    let userBlob = null
    let userId = null
    try {
      userBlob = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      userId = userBlob.data.id;

    } catch (err) {
      console.log(err);
    }

    // Fetch Playlists
    let playlistsBlob = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    const playlistsData = playlistsBlob.data.items.map(item => item);

    // Fetch Songs
    const playlistsLinks = playlistsBlob.data.items.map(item => item.href);

    let songsPromises = playlistsLinks.map(async playlistLink => await axios.get(playlistLink, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }));

    const songsObject = await Promise.all(songsPromises)

    songsObject.forEach((songObject, index) => {
      const trackList = songObject.data.tracks.items.map(item => item.track)

      playlistsData[index].songs = trackList;
    })

    this.setState({ user: { name: userId }, playlists: playlistsData })
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    let { user } = this.state
    let { playlists } = this.state
    let playlistsSelected = null;
    const username = user.name.replace(/\b\w/g, l => l.toUpperCase());

    !_.isEmpty(user) && !_.isEmpty(playlists)
      ? playlistsSelected = playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filter.toLowerCase()))
      : playlistsSelected = []


    const env = window.location.href.includes('localhost')
      ? 'http://localhost:8888/login'
      : 'https://react-ans-spotify-backend.herokuapp.com/login'

    return (
      <div className="App">
        {
          !_.isEmpty(user)
            ? <div>
              <h1 style={defaultStyle}>Playlist de {username}</h1>
              <PlaylistCounter playlists={playlistsSelected} />
              <HoursCounter playlists={playlistsSelected} />
              <Filter filter={this.state.filter} handleChange={this.handleChange} />
              {
                playlistsSelected.map(playlist => <Playlist key={playlist.id} playlist={playlist} />)
              }
            </div>

            : <a href={env} style={{ width: '200px', padding: '20px', backgroundColor: '#CCC', borderRadius: '10px', display: 'inline-block', marginTop: '20px', textDecoration: 'none', textTransform: 'uppercase', color: '#000' }}>Entrar com Spotify</a>
        }
      </div>
    );
  }
}

export default App;

