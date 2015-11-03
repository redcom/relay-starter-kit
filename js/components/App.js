import React from 'react';
import Relay from 'react-relay';

import AddMessage from '../mutations/message/AddMessageMutation';
import DeleteMessage from '../mutations/message/DeleteMessageMutation';

import InputChat from './InputChat';
import Messages from './Messages';

class App extends React.Component {

    _handleAddMessage = (message) => {
        Relay.Store.update(
            new AddMessage( {message, viewer: this.props.viewer})
        );
    }

    _handleDeleteMessage = (id) => {
        Relay.Store.update(
            new DeleteMessage( {id, viewer: this.props.viewer} )
        );
    }

    _render = (messages) => {
        return (
            <div>
                <h1> Chat list</h1>
                <Messages messages={messages} onDelete={this._handleDeleteMessage} />
                <InputChat onAdd={this._handleAddMessage} />
            </div>
        );
    }

    render() {
        let messages = this.props.viewer.messages;
        return this._render(messages);
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
