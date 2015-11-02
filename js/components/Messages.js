import React from 'react';
import Relay from 'react-relay';
import Moment from 'moment';

var {PropTypes} = React;


export default class Messages extends React.Component {

    static propTypes = {
        onDelete: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.setState({timeFormat: 'lll'});
    }

    deleteMessage(e) {
        this.props.onDelete({id: e.target.dataset.messageid});
    }

    _render(messages) {
        if (messages.length>0) {
            return (
                <div className="messages">
                    {messages.edges.map(edge =>
                                    <p key={edge.node.id}>{edge.node.content}
                                        <span className="time">{ Moment(edge.node.timestamp).format(this.state.timeFormat) }</span>
                                        <span className="delete" data-messageid={edge.node.id} onClick={this.deleteMessage.bind(this)}>X</span>
                                    </p>
                                    )}
                                    </div>
            );
        } else {
            return (
                <div className="messages emptyList">
                    <p>The list is empty</p>
                </div>
            );
        }
    }

    render() {
        let messages = this.props.viewer.messages;
        console.log(messages.length);
        return this._render(messages)
    }
}

