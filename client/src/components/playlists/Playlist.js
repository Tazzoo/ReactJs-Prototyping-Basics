import React from 'react';
import _ from 'lodash';

import Song from './Song';

const Playlist = ({ playlist }) => {
    const name = playlist.name.substring(0, 30);
    const songsSorted = _.sortBy(playlist.songs, 'popularity').reverse();
    const songDisplayQuantity = 5;

    const styles = {
        container: {
            margin: '0 auto',
            maxWidth: '60%',
            width: '30%'
            // display: 'inline-block',
            // margin: '30px'
        }
    };

    return (
        <div className='col-sm rl-playlist' style={styles.container}>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                </div>
                <img className='card-img-top' src={playlist.images[0].url} alt='Playlist' />
                <ul className='list-group list-group-flush'>
                    {songsSorted.slice(0, songDisplayQuantity).map(song => (
                        <Song key={song.id} song={song} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Playlist;
