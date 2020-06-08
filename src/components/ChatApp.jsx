import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Messages from "./Messages";
import {nanoid} from 'nanoid'
import MessageForm from "./MessageForm";
import MessageModel from "../models/MessageModel";

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.userId = this.getUserId();
        this.interval = null;
        this.intervalTime = props.intervalTime;
        this.lastMessageId = 0;
    }

    getUserId() {
        let userid = window.localStorage.getItem('userid');
        if (!userid) {
            userid = window.localStorage.setItem('userid', nanoid())
        }
        return userid;
    }

    componentDidMount() {
        window.setInterval(() => {
            this.updateChat();
        }, this.intervalTime);
    }

    updateChat() {
        fetch(process.env.REACT_APP_UPDATE_URL)
            .then(response => response.json())
            .then(data => {
                const remote_lastMessageId = (data.length > 0) ? data[data.length - 1].id : 0;
                if (remote_lastMessageId > this.lastMessageId) {
                    this.setState({messages: [...data.map(item => new MessageModel(item.userId, item.content, item.id))]});
                    this.lastMessageId = remote_lastMessageId;
                }

            });
    }


    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    handleAdd = (form) => {
        this.sendMessage(form.content);
    };

    sendMessage = (content) => {
        const newMessage = new MessageModel(this.userId, content, (this.lastMessageId + 1));
        fetch(process.env.REACT_APP_UPDATE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newMessage)
        }).then(data => {
            this.updateChat();
        });
    };

    render() {
        return (
            <>
                <div className="clearfix container">
                    <div className="chat">
                        <div className="chat-history">
                            <Messages localUser={this.userId} list={this.state.messages}/>
                        </div>
                    </div>
                    <MessageForm onSubmit={this.handleAdd}/>
                </div>
            </>
        );
    }
}

ChatApp.propTypes = {
    intervalTime: PropTypes.number
};

ChatApp.defaultProps = {
    intervalTime: 400
};

export default ChatApp;