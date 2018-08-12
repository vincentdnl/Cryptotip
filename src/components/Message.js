import React from "react";

const Message = ({message, handleMessageChange}) => <div className="message">
    <label htmlFor="message small-text"><b>Message</b>&#160;(optional):</label>
    <input type="text" name="message" value={message} placeholder="Message (optional)"
           onChange={(event) => {handleMessageChange(event.target.value)}}/>
</div>;

export default Message;
