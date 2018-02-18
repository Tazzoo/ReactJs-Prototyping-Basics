import React, { Component } from 'react';
import Playlist from './components/Playlist';
import Filter from './components/Filter';
import PlaylistCounter from "./components/PlaylistCounter";
import HoursCounter from "./components/HoursCounter";
import Env from "./config/keys";
import defaultStyle from './styles';
import queryString from "querystring";
import axios from "axios";
import _ from "lodash";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { user: {}, playlists: [], filter: '' }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // Fetch Name
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed['?access_token'];
    try {
      const res = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      this.setState({ user: { name: res.data.id } })
    } catch (err) {
      console.log(err);
    }

    // Fetch Playlists
    try {
      const res = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })

      let userPlaylists = res.data.items.map(item => (
        { name: item.name, songs: [], imageUrl: item.images[0].url }
      ))

      this.setState({ playlists: userPlaylists });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    let { user } = this.state
    let { playlists } = this.state
    let playlistsSelected = null;

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
              <h1 style={defaultStyle}>Playlist de {user.name}</h1>
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

