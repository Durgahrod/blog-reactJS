import React from 'react';
import { Button, Tooltip } from 'antd';

export default class AddButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Tooltip title={this.props.Tooltip}>
                    <Button type="primary"
                        onClick={this.props.onClick}
                        size={this.props.size}
                        shape={this.props.shape}
                        icon={this.props.icon}
                    >
                        {this.props.content}
                    </Button>
                </Tooltip>
            </div>
        )
    }
}
