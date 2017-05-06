import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class MessageItem extends Component {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        times: 1.5,
        onClose: () => {}
    }

    close() {
        const {onClose} = this.props;
        this.clearTimes();
        onClose();
    }
    clearTimes() {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    componentDidMount() {
        const {times, type} = this.props;
        if(times) {
            this.timer = setTimeout(() => {
                this.close();
            }, times * 1000)
        }
    }

    render() {
        const {children, prefixCls, type} = this.props;
        const componentClass = `${prefixCls}-container`;
        let typeClassname;
        if(type) {
            typeClassname = `${componentClass}-${type}`
        } else {
            typeClassname = `${componentClass}-success`
        }
        const className = {
            [`${componentClass}`]: 1,
            [`${typeClassname}`]: 1
        }
        return (
            <div className={classnames(className)}>
                <div className={`${componentClass}-content`}>{children}</div>
            </div>
        )
    }
}

MessageItem.propTypes = {
    times: PropTypes.number,
    onClose: PropTypes.func
}