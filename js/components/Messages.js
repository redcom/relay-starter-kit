import React from 'react';
import Relay from 'react-relay';
import Moment from 'moment';


export default class Messages extends React.Component {

    click(e) {
        e.target.parentNode.remove();
    }

  render() {
    let messages = this.props.viewer.widgets;
    console.log(Moment);
    return (
        <div className="messages">
          {messages.edges.map(edge =>
            <p key={edge.node.id}>{edge.node.content} (ID: {edge.node.id})

                <span className="time">{edge.node.timestamp}</span>
                <span className="delete" onClick={this.click.bind(this)}>X</span>
            </p>
          )}
        </div>
    );
  }
}

