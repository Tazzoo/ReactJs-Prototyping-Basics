import React from 'react';
import axios from 'axios';
import queryString from 'querystring';
import _ from 'lodash';

// Components
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import Playlists from './components/playlists/Playlists';
import NotLoggedIn from './components/NotLoggedIn';

// CSS
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                accessToken: ''
            },
            playlists: [],
            filter: '',
            fetchData: false
        };

        this.findEnv = this.findEnv.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this.setUserAccessToken();
    }

    async componentDidUpdate() {
        const { accessToken } = this.state.user;
        const { fetchData } = this.state;

        if (!_.isEmpty(accessToken) && !fetchData) {
            const username = await this.fetchUsername();
            const playlists = await this.fetchUserPlaylists();

            this.setState((currState, prevState) => {
                return { ...currState, user: { ...currState.user, name: username }, playlists, fetchData: true };
            });
        }
    }

    render() {
        let homepage;
        let { user, playlists, filter } = this.state;
        let searchPlaylist = null;

        if (!_.isEmpty(user.name)) {
            if (!_.isEmpty(playlists)) {
                searchPlaylist = playlists.filter(playlist => {
                    const matchesPlaylistName = playlist.name.toLowerCase().includes(filter.toLowerCase());

                    // Compara se o nome no filtro bate com o nome da playlist
                    if (matchesPlaylistName) {
                        return matchesPlaylistName;
                    }

                    // Compara se o nome no filtro bate com o nome de alguma musica
                    let allSongsName = [];
                    const playlistSongsName = this.getPlaylistSongsName(playlist);
                    
                    if (_.isEmpty(allSongsName)) {
                        allSongsName = playlistSongsName;
                    } else {
                        allSongsName.push(playlistSongsName);
                    }

                    const matchesPlaylistSongName = allSongsName.find(song => song.toLowerCase().includes(filter.toLowerCase()));

                    // Retorna verdade se o nome de alguma letra já está na playlist
                    return matchesPlaylistSongName;
                });
            } else {
                searchPlaylist = [];
            }
        }

        const isUserLoggedIn = !_.isEmpty(user.accessToken) && !_.isEmpty(user.name);
        if (isUserLoggedIn) {
            homepage = (
                <div>
                    <Navbar username={user.name} filter={filter} handleChange={this.handleChange} />
                    <Header playlists={searchPlaylist} />
                    <Playlists playlists={searchPlaylist} />
                </div>
            );
        } else {
            homepage = <NotLoggedIn findEnv={this.findEnv} />;
        }

        return <div className='App mb-5'>{homepage}</div>;
    }

    handleChange(event) {
        this.setState({ filter: event.target.value });
    }

    findEnv() {
        if (window.location.href.includes('localhost')) {
            return 'http://localhost:8888/login';
        }

        return 'https://react-ans-spotify-backend.herokuapp.com/login';
    }

    setUserAccessToken() {
        const parsed = queryString.parse(window.location.search);
        const accessToken = parsed['?access_token'];

        if (!_.isEmpty(accessToken)) {
            this.setState((currState, prevState) => {
                return { ...prevState, user: { accessToken } };
            });
        }
    }

    getPlaylistSongsName(playlist) {
        return playlist.songs.map(song => song.name);
    }

    async fetchUsername() {
        const { accessToken } = this.state.user;

        try {
            const { data } = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });

            return data.display_name;
        } catch (err) {
            console.log(err);
        }
    }

    async fetchUserPlaylists() {
        const playlists = await this.fetchUserPlaylistsLinks();
        const songs = await this.fetchUserSongs(playlists);

        songs.forEach((song, index) => {
            const trackList = song.data.tracks.items.map(item => item.track);

            playlists[index].songs = [];
            playlists[index].songs = trackList;
        });

        return playlists;
    }

    async fetchUserPlaylistsLinks() {
        const { accessToken } = this.state.user;

        const { data } = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        return data.items;
    }

    async fetchUserSongs(playlists) {
        const { accessToken } = this.state.user;

        const songsLinks = playlists.map(playlist => playlist.href);

        // const songsPromises = songsLinks.forEach(songLink => {
        //   const songs = await axios.get(songLink)
        // })
        const songsPromises = songsLinks.map(
            async songLink =>
                await axios.get(songLink, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
        );

        const songs = await Promise.all(songsPromises);

        return songs;
    }
}

export default App;
