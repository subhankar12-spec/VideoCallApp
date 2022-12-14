import React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Stack,
  Card,
  Drawer,
  Button,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import MicOffIcon from '@mui/icons-material/MicOff';
import Mic from '@mui/icons-material/Mic';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import { useState } from 'react';
import Messages from '../Messages/Messages';

const VideoCallBar = ({
  audio,
  audioHandler,
  video,
  videoHandler,
  disconnect,
  chats,
  inputRef,
  sendMessage,
  isPresenting,
  screenShare,
  stopScreenShare,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  console.log('drawer', isDrawerOpen);
  return (
    <Box>
      <Stack direction="row" justifyContent="center" gap={4}>
        {video ? (
          <IconButton color="secondary" onClick={videoHandler}>
            <VideocamIcon />
          </IconButton>
        ) : (
          <IconButton color="secondary" onClick={videoHandler}>
            <VideocamOffIcon />
          </IconButton>
        )}
        {audio ? (
          <IconButton color="secondary" onClick={audioHandler}>
            <MicOffIcon />
          </IconButton>
        ) : (
          <IconButton color="secondary" onClick={audioHandler}>
            <Mic />
          </IconButton>
        )}
        <IconButton color="secondary" onClick={disconnect}>
          <CallEndIcon />
        </IconButton>
        {/* <IconButton color="secondary" onClick={}>
          <ChatBubbleOutlineIcon />
        </IconButton> */}
        <Button
          color="secondary"
          edge="start"
          onClick={toggleDrawer}
          // console.log('onClick', isDrawerOpen);
        >
          <ChatBubbleOutlineIcon />
        </Button>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <Box p={2} width="50vh">
            <Messages
              chats={chats}
              inputRef={inputRef}
              sendMessage={sendMessage}
            />
          </Box>
        </Drawer>
        {isPresenting ? (
          <IconButton color="secondary" onClick={stopScreenShare}>
            <StopScreenShareIcon />
          </IconButton>
        ) : (
          <IconButton color="secondary" onClick={screenShare}>
            <ScreenShareIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default VideoCallBar;
