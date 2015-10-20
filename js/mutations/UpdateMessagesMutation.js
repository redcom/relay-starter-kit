export default class UpdateMessagesMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Message {
        id,
content,
        timestamp,
      }
  };
  getMutation() {
    return Relay.QL`mutation{updateMessages}`;
  }
  getCollisionKey() {
    return `check_${this.props.message.id}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateMessagesPayload {
        message {
content,
        timestamp
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        message: this.props.message.id,
      },
    }];
  }
  getVariables() {
    return {
        id: this.props.message.id,
        content: this.props.message.content,
        timestamp: this.props.message.timestamp
    };
  }
    getOptimisticResponse() {
        return {
            message: {
                content: this.props.message.content,
                timestamp: this.props.message.timestamp
            };
        }
    }
}
