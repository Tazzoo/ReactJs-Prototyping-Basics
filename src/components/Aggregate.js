import React from "react";
import defaultStyle from '../styles';

class Aggregate extends React.Component {
  render() {
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={defaultStyle}>Number Text</h2>
      </div>
    )
  }
}

export default Aggregate;