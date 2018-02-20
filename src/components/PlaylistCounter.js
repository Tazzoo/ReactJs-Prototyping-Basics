import React from "react";

const PlaylistCounter = (props) => (
  <div className="card rl-card" style={{ width: '90%' }} >
    <div className="card-body" >
      <h5 className="card-text" >
        {props.playlists.length}
        {props.playlists.length > 1 ? ' Playlists' : ' Playlist'}
      </h5>
    </div>
  </div>
)

export default PlaylistCounter