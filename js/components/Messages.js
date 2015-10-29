import React from 'react';
import Relay from 'react-relay';
import Moment from 'moment';


export default class Messages extends React.Component {


    componentWillMount() {
        this.setState({timeFormat: 'lll'});
    }

    click(e) {
        e.target.parentNode.remove();
    }

  render() {
    let messages = this.props.viewer.messages;

    console.log(this.props.viewer);

    return (
        <div className="messages">
          {messages.edges.map(edge =>
            <p key={edge.node.id}>{edge.node.content}
                <span className="time">{ Moment(edge.node.timestamp).format(this.state.timeFormat) }</span>
                <span className="delete" onClick={this.click.bind(this)}>X</span>
            </p>
          )}
        </div>
    );
  }
}

