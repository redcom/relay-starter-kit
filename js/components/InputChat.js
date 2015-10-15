import React from 'react';
import ReactDOM from 'react-dom';


export default class InputChat extends React.Component {

    render() {
        return (
            <div className="message">
                <textarea placeholder="Add a jot to yourself and press <Enter>"></textarea>
            </div>
        );
    }
}

