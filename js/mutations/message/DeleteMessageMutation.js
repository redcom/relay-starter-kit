/*
   DeleteMessageMutation ed to delete a message from MessageList database
*/

import Relay from 'react-relay';

export default class DeleteMessageMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{deleteMessage}`;
  }

  getFatQuery() {
    return Relay.QL`
    fragment on DeleteMessagePayload {
      deletedMessage,
      viewer {
          id,
      }
    }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'messages',
      deletedIDFieldName: 'deletedMessage'
    }];
  }
  getVariables() {
    return {
      id: this.props.id.id
    };
  }
  getOptimisticResponse() {
    return {
      messageDeleted: this.props.id.id,
      viewer: {
        id: this.props.viewer.id,
      },
    };
  }
}
