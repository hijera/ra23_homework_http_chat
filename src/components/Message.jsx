import React from 'react';
import PropTypes from 'prop-types';
import MessageModel from "../models/MessageModel";

Message.propTypes = {
    message : PropTypes.instanceOf(MessageModel),
    type: PropTypes.string
};

function Message(props) {
    const {message,type} = props;
    const isLocal=(type=="local");
    return (
        <li className="clearfix">
            <div className={"message-data "+(isLocal)?"align-right":""}>
            </div>
            <div className={"message "+((!isLocal)?"my-message":"other-message float-right")}>
                {(message.content && message.content.trim().length>0) ? message.content : <span className={"placeholder"} >[Пустое сообщение]</span>}
            </div>
        </li>
    );
}

Message.defaultProps = {
    type: "local"
};

export default Message;