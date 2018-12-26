import React from 'react';

const PlaylistCounter = ({ playlists }) => {
    let playlistCounter = playlists.length + ' ';
    playlists.length > 1 ? (playlistCounter += 'Playlists') : (playlistCounter += 'Playlist');

    return (
        <div className='card rl-card' style={{ display: 'inline-block', width: '30%' }}>
            <div className='card-body'>
                <h5 className='card-text'>{playlistCounter}</h5>
            </div>
        </div>
    );
};

export default PlaylistCounter;
