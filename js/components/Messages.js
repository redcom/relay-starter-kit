import React from 'react';
import Relay from 'react-relay';


export default class Messages extends React.Component {

  render() {
    let widgets = this.props.viewer.widgets;
    return (
        <div className="messages">
          {widgets.edges.map(edge =>
            <p key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})

                <span className="time">Time</span>
                <span className="delete">X</span>
            </p>
          )}
        </div>
    );
  }
}

