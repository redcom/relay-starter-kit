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
        if(e.keyCode === 13) {
            this.setState({value: e.target.value});
            e.target.value = "";
        }
    }

    render() {
        return (
                <input
                    className="message"
                    placeholder="Add a jot to yourself and press <Enter>"
                    onChange={this.keyPressHandler.bind(this)}
                    value={this.state.value}
                />
        );
    }
}

