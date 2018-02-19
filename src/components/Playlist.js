import React from "react";
import defaultStyle from "../styles"
import _ from 'lodash'

const Playlist = (props) => {
  const name = props.playlist.name.substring(0, 30)

  const songsSorted = _.sortBy(props.playlist.songs, 'popularity').reverse();

  return (
    <div style={{ ...defaultStyle, display: 'inline-block', margin: '30px' }}>
      <img style={{ maxHeight: '150px' }} alt="Playlist" src={props.playlist.images[0].url} />
      <h3>{name}</h3>
      <ul style={{ listStyleType: 'none' }}>
        {
          songsSorted.slice(0, 3).map(song => {
            return <li>{song.name} - {song.popularity}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Playlist;