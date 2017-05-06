import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MessageItem from './MessageItem';
import './index.scss';

let count = 1;
const now = Date.now();

function getUuid() {
    return `message-${now}-${count++}`;
}

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    static defaultProps = {
        prefixCls: 'rc-message'
    }

    add(message) {
        const key = message.key = message.key || getUuid();
        this.setState(preState => {
            const {messages} = preState;
            if(!messages.filter(i => i.key === key).length) {
                return {
                    messages: messages.concat(message)
                }
            }
        })
    }

    remove(key) {
        this.setState(preState => {
            return {
                messages: preState.messages.filter(i => i.key !== key)
            }
        })
    }

    render() {
        const {messages} = this.state;
        const messageNode = messages.map(message => {
            const onClose = () => {
                this.remove.call(this, message.key);
                message.onClose && message.onClose();
            }
            return (
                <MessageItem
                    {...message}
                    prefixCls={this.props.prefixCls}
                    onClose={onClose}
                >
                    {message.content}
                </MessageItem>
            )
        })
        return (
            <div className="message-container">
                {messageNode}
            </div>
        )
    }
}

Message.propTypes = {
    prefixCls: PropTypes.string
}

Message.newInstance = function(properties) {
    const {getContainer, ...props} = properties;
    let div;
    if(getContainer) {
        div = getContainer();
    } else {
        div = document.createElement('div');
        document.body.appendChild(div);
    }

    const messageInstance = ReactDOM.render(
        <Message {...props}/>, div
    )
    return {
        message(opts) {
            messageInstance.add(opts);
        },
        removeMessage(key) {
            messageInstance.remove(key)
        },
        component: messageInstance,
        destory() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}