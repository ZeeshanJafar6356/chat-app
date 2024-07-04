// frontend/src/Chat.js
import React, { useState, useEffect } from 'react';
import socket from './socket';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Styled components using MUI's styled API
const ChatContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '80%',
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '20px',
}));

const ChatBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  overflowY: 'auto',
  padding: '10px',
  backgroundColor: '#ffffff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
}));

const ChatInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const ChatMessage = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
}));

const SectionContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#ffffff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    socket.on('chat message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('room users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('available rooms', (rooms) => {
      setAvailableRooms(rooms);
    });

    return () => {
      socket.off('chat message');
      socket.off('room users');
      socket.off('available rooms');
    };
  }, []);

  const joinRoom = () => {
    if (room && username) {
      socket.emit('join room', { room, username });
    }
  };

  const sendMessage = () => {
    if (input) {
      socket.emit('chat message', { room, message: input });
      setInput('');
    }
  };

  const listRooms = () => {
    socket.emit('list rooms');
  };

  console.log(process.env)
  console.log("msg")
  console.log(process.env.REACT_APP_STAGE)

  return (
    
    <ChatContainer elevation={3}>
      <ChatHeader>
        <TextField
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={joinRoom}>
          Join Room
        </Button>
        <Button variant="outlined" color="secondary" onClick={listRooms}>
          List Rooms
        </Button>
      </ChatHeader>

      <ChatBox>
        {messages.map((msg, index) => (
          <ChatMessage key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </ChatMessage>
        ))}
      </ChatBox>

      <ChatInputContainer>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="success" onClick={sendMessage}>
          Send
        </Button>
      </ChatInputContainer>

      <SectionContainer elevation={2}>
        <Typography variant="h6">Online Users:</Typography>
        <List>
          {onlineUsers.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </SectionContainer>

      <SectionContainer elevation={2}>
        <Typography variant="h6">Available Rooms:</Typography>
        <List>
          {availableRooms.map((room, index) => (
            <ListItem key={index}>
              <ListItemText primary={room} />
            </ListItem>
          ))}
        </List>
      </SectionContainer>
    </ChatContainer>
  );
};

export default Chat;
