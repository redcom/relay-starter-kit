import React from 'react';
import Relay from 'react-relay';

import InputChat from './InputChat';
import Messages from './Messages';

class App extends React.Component {
  render() {
    let viewer = this.props.viewer;
    return (
      <div>
        <h1> Chat list</h1>
        <Messages viewer={viewer} />
        <InputChat />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on MessageList {
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
