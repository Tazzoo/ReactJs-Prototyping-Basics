import React from "react";
import _ from "lodash";
import defaultStyle from '../styles';

const Hour = (props) => {

  let totalMs = 0;
  _.forEach(props.playlists, playlist => {
    _.forEach(playlist.songs, song => {
      totalMs += song.duration_ms;
    })
  })
  const totalMinutes = msToTime(totalMs)

  return (
    <div style={{ width: "40%", display: "inline-block" }}>
      <h2 style={defaultStyle}>
        {totalMinutes}
      </h2>
    </div>
  )

  function msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);;

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "h " + minutes + "m " + seconds + "s";
  }
}

export default Hour