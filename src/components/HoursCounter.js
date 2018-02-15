import React from "react";
import defaultStyle from '../styles';

class HoursCounter extends React.Component {
  render() {
    let allSongs = this.props.playlistsInfo.reduce((acumulator, playlistInfo) => {
      return acumulator.concat(playlistInfo.songs)
    }, []);

    let totalDuration = allSongs.reduce((acumulator, song) => {
      return acumulator + song.duration;
    }, 0);

    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={defaultStyle}>
          {Math.floor(totalDuration / 60)}
          {totalDuration > 1 ? ' Hours' : ' Hour'}
        </h2>
      </div>
    );
  }
}

export default HoursCounter