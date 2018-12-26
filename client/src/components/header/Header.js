import React from 'react';
import PlaylistCounter from './PlaylistCounter';
import HoursCounter from './HoursCounter';
import Info from './Info';

const Header = ({ playlists }) => {
    return (
        <div className='container mb-5'>
            {/* <div className='row d-flex justify-content-between'> */}
            <div className='row'>
                <PlaylistCounter playlists={playlists} />
                <Info />
                <HoursCounter playlists={playlists} />
            </div>
        </div>
    );
};

export default Header;
