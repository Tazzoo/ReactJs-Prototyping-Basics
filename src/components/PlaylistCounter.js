import React from "react";
import defaultStyle from '../styles';

const PlaylistCounter = (props) => (
  <div style={{ width: "40%", display: "inline-block" }}>
    <h2 style={defaultStyle}>
      {props.playlists.length}
      {props.playlists.length > 1 ? ' Playlists' : ' Playlist'}
    </h2>
  </div>
)

export default PlaylistCounter