import React from "react";
import defaultStyle from "../styles"

const Playlist = (props) => (
  <div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
    <img alt="" />
    <h3>{props.playlist.name}</h3>
    <ul style={{ listStyleType: 'none' }}>
      {
        props.playlist.songs.map(song => {
          return <li key={song.name}>{song.name}</li>
        })
      }
    </ul>
  </div>
);

export default Playlist;