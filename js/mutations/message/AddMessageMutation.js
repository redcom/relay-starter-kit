/*
   AddMessageMutation add a message to MessageList
*/
import Relay from 'react-relay';

export default class AddMessageMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
    fragment on Message {
      id,
      content,
      timestamp,
    }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{addMessage}`;
  }
  getFatQuery() {
    return Relay.QL`
    fragment on AddMessagePayload {
      message {
        content,
        timestamp,
      },
    }
    `;
  }
  getConfigs() {
    return [{
      type: 'MESSAGE_ADD',
      fieldIDs: {
        content: this.props.content,
        timestamp: this.props.timestamp,
      },
    }];
  }
  getVariables() {
    return {
      content: this.props.content,
      timestamp: this.props.timestamp,
    };
  }
  getOptimisticResponse() {
    return {
      message: {
        content: this.props.content,
        timestamp: this.props.timestamp,
      },
    }
  }
}
