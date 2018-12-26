import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import Song from './Song';

const PlaylistContainer = styled.div`
    margin: 0 auto;
    maxwidth: 60%;
    width: 30%;
`;

const Playlist = ({ playlist }) => {
    const name = playlist.name.substring(0, 30);
    const songsSortedDec = _.sortBy(playlist.songs, 'popularity').reverse();
    const songDisplayQuantity = 5;

    return (
        <PlaylistContainer className='col-12 col-lg-4 col-xl-3 mb-4'>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                </div>
                <img className='card-img-top' src={playlist.images[0].url} alt='Playlist' />
                <ul className='list-group list-group-flush'>
                    {songsSortedDec.slice(0, songDisplayQuantity).map(song => (
                        <Song key={song.id} song={song} />
                    ))}
                </ul>
            </div>
        </PlaylistContainer>
    );
};

export default Playlist;
