import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'
import './chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setname] = useState('')
  const [room, setroom] = useState('')
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setname(name)
    setroom(room)
    socket.emit('join', { name, room } , ({error}) => {
        alert(error)
    });


    return () => {
      socket.emit('disconnect');
      socket.off()
    }

  }, [ENDPOINT, location.search])

  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default Chat