import React from 'react';
import styled from 'styled-components';

const PlaylistCounterContainer = styled.div`
    flex-grow: 1;
`;

const PlaylistCounter = ({ playlists }) => {
    let playlistCounter = playlists.length + ' ';
    playlists.length > 1 ? (playlistCounter += 'Playlists') : (playlistCounter += 'Playlist');

    return (
        <PlaylistCounterContainer className='card rl-card col-lg-3'>
            <div className='card-body'>
                <h5 className='card-text'>{playlistCounter}</h5>
            </div>
        </PlaylistCounterContainer>
    );
};

export default PlaylistCounter;
