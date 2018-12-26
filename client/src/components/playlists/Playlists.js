import React from 'react';
import Playlist from './Playlist';

const Playlists = ({ playlists }) => {
    return (
        <div className='container'>
            <div className='row d-flex justify-content-between'>
                {playlists.map(playlist => (
                    <Playlist key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};

export default Playlists;
