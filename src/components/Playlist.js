import React from "react";
import defaultStyle from "../styles"

class Playlist extends React.Component {
  render() {
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
        <img />
        <h3>List Name</h3>
        <ul style={{ listStyleType: 'none' }}>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    )
  }
}

export default Playlist;