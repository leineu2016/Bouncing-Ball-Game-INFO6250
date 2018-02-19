import React from 'react';
export class Username extends React.Component {
    render() {
        return (
            <p>
                <input type="text" ref="username" style={this.props.style} value={this.props.username} onChange={this.props.onInput} />
            </p>
        );
    }
}
