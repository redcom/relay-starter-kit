/*
   AddMessageMutation add a message to MessageList
*/

import Relay from 'react-relay';

export default class AddMessageMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{addMessage}`;
  }

  getFatQuery() {
    return Relay.QL`
    fragment on AddMessagePayload {
      messageEdge,
      viewer {
          id,
      }
    }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'messages',
      edgeName: 'messageEdge',
      rangeBehaviors: {
        '': 'append',
        'orderby(newest)': 'prepend',
      }
    }];
  }
  getVariables() {
    return {
      content: this.props.message.content,
      timestamp: this.props.message.timestamp,
    };
  }
  getOptimisticResponse() {
    return {
      messageEdge: {
        node: {
          id: this.props.message.id,
          content: this.props.message.content,
          timestamp: this.props.message.timestamp,
        }
      },
      viewer: {
        id: this.props.viewer.id,
      },
    };
  }
}
