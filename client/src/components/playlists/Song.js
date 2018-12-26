import React from 'react';

const Song = ({ song }) => {
    return (
        <li key={song.id} className='list-group-item'>
            {song.name} [{song.popularity}]
        </li>
    );
};

export default Song;
