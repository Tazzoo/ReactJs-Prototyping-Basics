import React from "react";
import _ from 'lodash'

const Playlist = (props) => {
  const name = props.playlist.name.substring(0, 30)

  const songsSorted = _.sortBy(props.playlist.songs, 'popularity').reverse();

  const styles = {
    container: {
      margin: '0 auto',
      maxWidth: '60%',
      width: '30%',
      // display: 'inline-block',
      // margin: '30px'
    }
  }

  return (
    <div className="col-sm rl-playlist" style={styles.container}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
        </div>
        <img className="card-img-top" src={props.playlist.images[0].url} alt="Playlist" />
        <ul className="list-group list-group-flush">
          {
            songsSorted.slice(0, 3).map(song => {
              return <li className="list-group-item">{song.name} [{song.popularity}]</li>
            })
          }
        </ul>
      </div>
    </div>

  )

}

export default Playlist;