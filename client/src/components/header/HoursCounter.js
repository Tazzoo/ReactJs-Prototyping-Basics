import React from 'react';
import styled from 'styled-components';

const HoursCounterContainer = styled.div`
    flex-grow: 1;
`;

const HoursCounter = ({ playlists }) => {
    const totalMilliseconds = getTotalMilliseconds(playlists);
    const time = millisecondsToTime(totalMilliseconds);

    return (
        <HoursCounterContainer className='card rl-card col-lg-3'>
            <div className='card-body'>
                <h5 className='card-text'>{time}</h5>
            </div>
        </HoursCounterContainer>
    );

    function getTotalMilliseconds(playlists) {
        let totalMilliseconds = 0;

        playlists.forEach(playlist => {
            playlist.songs.forEach(song => {
                totalMilliseconds += song.duration_ms;
            });
        });

        return totalMilliseconds;
    }

    function millisecondsToTime(duration) {
        let seconds = parseInt((duration / 1000) % 60, 10);
        let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
};

export default HoursCounter;
