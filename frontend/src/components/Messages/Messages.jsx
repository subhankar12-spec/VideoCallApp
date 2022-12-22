import { Typography, Box, Paper, Stack, IconButton } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import './Messages.css';
import { useRef } from 'react';
import { useState } from 'react';
const Messages = ({ chats, inputRef, sendMessage }) => {
  const [message, setMessage] = useState();
  const messageHandler = () => {
    setMessage(inputRef.current.value);
    console.log('chats', chats);
  };
  return (
    <div>
      {console.log(chats)}
      <Box className="header">
        <Typography variant="h5">Chats</Typography>
      </Box>
      <Stack className="messageBox" height="460px" gap={3} p={2}>
        {chats.length > 0 &&
          chats.map((chat) => (
            <Paper>
              <Box className="messages">
                <Box p={1}>{chat.id}</Box>
                <Box p={1}>
                  <Typography variant="body2">{chat.message}</Typography>
                </Box>
              </Box>
            </Paper>
          ))}
      </Stack>
      <Box>
        <input
          placeholder="Type here..."
          ref={inputRef}
          style={{
            flex: 1,
            borderRadius: '21px',
            padding: '12px',
            outlineWidth: 0,
          }}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default Messages;
