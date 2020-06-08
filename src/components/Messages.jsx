import React from 'react';
import PropTypes from 'prop-types';
import Message from "./Message";
import MessageModel from "../models/MessageModel";

Messages.propTypes = {
    list : PropTypes.arrayOf(PropTypes.instanceOf(MessageModel)),
    localUser: PropTypes.string
};

function Messages(props) {
    const { list,localUser } = props;
    return (
        <>
            {list.length > 0 &&
            <ul>
                {list.map(message => (
                    <Message type={(localUser && localUser===message.userId)? "local" : "remote"} message={message} key={message.id}/>
                    ))}
            </ul>
            }
        </>
    );
}
Messages.defaultProps = {
    list: [],
    localUser: null
};

export default Messages;