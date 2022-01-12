import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';

function UserCount() {
  const [numUsers, updateNumUsers] = useState(0);

  useEffect(() => {
    socket.on('connection', (content) => {
      updateNumUsers(content.numUsers);
    });

    socket.on('disconnection', (content) => {
      updateNumUsers(content.numUsers);
    });
  });

  if (numUsers === 1) {
    return <div>Currently Online: {numUsers} user</div>
  }
  return <div>Currently Online: {numUsers} users</div>;
};

export default UserCount;
