import React from 'react';
import _ from 'lodash';

const Hour = props => {
  let totalMs = 0;
  _.forEach(props.playlists, playlist => {
    _.forEach(playlist.songs, song => {
      totalMs += song.duration_ms;
    });
  });
  const totalMinutes = msToTime(totalMs);

  return (
    <div className='card rl-card' style={{ display: 'inline-block', width: '30%' }}>
      <div className='card-body'>
        <h5 className='card-text'>
          {/* <div style={{ width: "40%", display: "inline-block" }}> */}
          {totalMinutes}
        </h5>
      </div>
    </div>
  );

  function msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + 'h ' + minutes + 'm ' + seconds + 's';
  }
};

export default Hour;