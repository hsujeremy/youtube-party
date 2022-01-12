import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';

function Chat() {
  const [messages, updateMessages] = useState([]);
  const [currentMessage, updateCurrentMessage] = useState('');

  useEffect(() => {
    socket.on('chat', (data) => {
      let newMessages = messages.concat([data]);
      updateMessages(newMessages);
    });
  });

  let handleChange = (e) => {
    updateCurrentMessage(e.target.value);
  };

  let handleSubmit = (e) => {
    console.log(socket.id);
    e.preventDefault();
    if (currentMessage.length > 0) {
      socket.emit('chat', {
        'timestamp': Date.now(),
        'message': currentMessage
      });
      updateCurrentMessage('');
    }
  }

  let messageList = messages.map(data =>
    <div key={data.timestamp}>{data.message}</div>
  );

  return (
    <div>
      <h2>Chat</h2>
      <div></div>
      {messageList}
      <form onSubmit={handleSubmit}>
        <input type='text' value={currentMessage} onChange={handleChange} />
        <input type='submit' value='Send Message' />
      </form>
    </div>
  );
};

export default Chat;
