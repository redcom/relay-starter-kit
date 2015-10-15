import React from 'react';
import ReactDOM from 'react-dom';


export default class InputChat extends React.Component {
    constructor(props) {
        super(props);
    }

    keyPressHandler(e) {
        if(e.keyCode === 13) {
            this.setState({value: e.target.value});
            e.target.value = "";
        }
    }

    render() {
        return (
                <textarea className="message" placeholder="Add a jot to yourself and press <Enter>"
                        onKeyUp={this.keyPressHandler.bind(this)}
                />
        );
    }
}

