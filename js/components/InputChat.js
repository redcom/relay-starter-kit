import React from 'react';
import ReactDOM from 'react-dom';

var {PropTypes} = React;

export default class InputChat extends React.Component {

    static defaultProps = {
    }

    static propTypes = {
        onAdd: PropTypes.func.isRequired
    }

    state = {
        value: ''
    }

    /*
     *componentDidMount() {
     *    ReactDOM.findDOMNode(this).focus(); //add focus on the textarea
     *}
     */

    keyPressHandler(e) {
        e.preventDefault();
        if(e.type==="keyup" && e.keyCode === 13) {
            this.props.onAdd({
                content: this.state.value,
                timestamp: Date.now()
            });
            this.setState({value: ""});
            return;
        }

        this.setState({value: e.target.value});
    }

    render() {
        return (
            <input
                className="message"
                placeholder="Add a jot to yourself and press <Enter>"
                    onChange={this.keyPressHandler.bind(this)}
                    onKeyUp={this.keyPressHandler.bind(this)}
                    value={this.state.value}
                    />
        );
    }
}

