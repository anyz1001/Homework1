import React, { Component } from 'react';
import styled from 'styled-components';

const LogContain = styled.div`
    border-bottom: solid black;
    cursor: pointer;
`;

class Logs extends Component {
    render() {
        return (
            <LogContain onClick={() => this.props.clickFun(this.props.index)}>
                <i className="fa fa-close w3-large"></i> {this.props.func} {this.props.curVal}
            </LogContain>
        )
    }
}

module.exports = Logs;