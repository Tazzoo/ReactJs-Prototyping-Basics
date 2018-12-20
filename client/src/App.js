import React, { Component } from 'react';
import Playlist from './components/Playlist';
import PlaylistCounter from './components/PlaylistCounter';
import HoursCounter from './components/HoursCounter';
import queryString from 'querystring';
import Info from './components/Info';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

import Navbar from './components/Navbar';

class App extends Component {
  constructor() {
    super();
    this.state = { user: { name: '' }, playlists: [], filter: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    // Fetch Name
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed['?access_token'];
    let userBlob = null;
    let userId = null;
    try {
      userBlob = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
      userId = userBlob.data.id;
    } catch (err) {
      console.log(err);
    }

    // Fetch Playlists
    let playlistsBlob = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const playlistsData = playlistsBlob.data.items.map(item => item);

    // Fetch Songs
    const playlistsLinks = playlistsBlob.data.items.map(item => item.href);

    let songsPromises = playlistsLinks.map(
      async playlistLink =>
        await axios.get(playlistLink, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        })
    );

    const songsObject = await Promise.all(songsPromises);

    songsObject.forEach((songObject, index) => {
      const trackList = songObject.data.tracks.items.map(item => item.track);

      playlistsData[index].songs = trackList;
    });

    this.setState({ user: { name: userId }, playlists: playlistsData });
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    let { user } = this.state;
    let { playlists } = this.state;
    let playlistsSelected = null;
    const username = user.name.replace(/\b\w/g, l => l.toUpperCase());

    // Validate User
    !_.isEmpty(user) && !_.isEmpty(playlists)
      ? (playlistsSelected = playlists.filter(playlist => {
          const matchesPlaylist = playlist.name.toLowerCase().includes(this.state.filter.toLowerCase());

          // let allSongsName = []
          // const matchesSong = _.values(playlists).map(playlist => playlist.songs).map(songs => songs.map(nested => nested.name))
          // matchesSong.forEach(songArray => songArray.forEach(songName => allSongsName.push(songName)))

          // let found = false;
          // let a = allSongsName.find(song => song.toLowerCase().includes(this.state.filter.toLowerCase()))

          // console.log(a)
          // return matchesPlaylist || a;
          return matchesPlaylist;
        }))
      : (playlistsSelected = []);

    const env = window.location.href.includes('localhost') ? 'http://localhost:8888/login' : 'https://react-ans-spotify-backend.herokuapp.com/login';

    return (
      <div className='App mb-5'>
        {!_.isEmpty(user) && user.name.length > 0 ? (
          <div>
            <Navbar username={username} filter={this.state.filter} handleChange={this.handleChange} />

            <div className='container mb-5'>
              <div className='row d-flex justify-content-around'>
                <PlaylistCounter playlists={playlistsSelected} />
                <Info />
                <HoursCounter playlists={playlistsSelected} />
              </div>
            </div>

            <div className='container'>
              <div className='row d-flex justify-content-around'>
                {playlistsSelected.map(playlist => (
                  <Playlist key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <a
            href={env}
            style={{
              width: '300px',
              padding: '10px 20px',
              backgroundColor: '#343A40',
              borderRadius: '10px',
              display: 'inline-block',
              marginTop: '20px',
              textDecoration: 'none',
              color: '#FFF'
            }}
          >
            Entrar com Spotify
          </a>
        )}
      </div>
    );
  }
}

export default App;
