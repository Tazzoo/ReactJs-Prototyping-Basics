import React from "react";
import defaultStyle from "../styles"

const Playlist = (props) => {
  const name = props.playlist.name.substring(0, 30)

  return (
    <div style={{ ...defaultStyle, display: 'inline-block', margin: '30px' }}>
      <img style={{ maxHeight: '150px' }} alt="Playlist" src={props.playlist.imageUrl} />
      <h3>{name}</h3>
      <ul style={{ listStyleType: 'none' }}>
        {
          props.playlist.songs.map(song => {
            return <li key={song.name}>{song.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Playlist;