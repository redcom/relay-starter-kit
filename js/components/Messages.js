import React from 'react';
import Relay from 'react-relay';


export default class Messages extends React.Component {

    click(e) {
        e.target.parentNode.remove();
    }

  render() {
    let widgets = this.props.viewer.widgets;
    return (
        <div className="messages">
          {widgets.edges.map(edge =>
            <p key={edge.node.id}>{edge.node.content} (ID: {edge.node.id})

                <span className="time">{edge.node.timestamp}</span>
                <span className="delete" onClick={this.click.bind(this)}>X</span>
            </p>
          )}
        </div>
    );
  }
}

