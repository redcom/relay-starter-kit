import React from 'react';
import Relay from 'react-relay';

import AddMessage from '../mutations/message/AddMessageMutation';
import InputChat from './InputChat';
import Messages from './Messages';

class App extends React.Component {

  _handleAddMessage = (message) => {
    Relay.Store.update(
      new AddMessage( {message, viewer: this.props.viewer} )
    );
  }
  render() {
    let viewer = this.props.viewer;
    return (
      <div>
        <h1> Chat list</h1>
        <Messages viewer={viewer} />
        <InputChat
          onAdd={this._handleAddMessage}
          />
        </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on MessageList {
      id,
      messages(first: 10) {
        edges {
          node {
            id,
            content,
            timestamp
          },
        },
      },
    }
    `,
  },
});
