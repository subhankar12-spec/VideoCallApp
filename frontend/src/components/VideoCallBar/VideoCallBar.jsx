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
  isPresenting,
  screenShare,
  stopScreenShare,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
        <IconButton
          color="secondary"
          edge="start"
          onClick={(e) => {
            setIsDrawerOpen(!isDrawerOpen);
            console.log('onClick', isDrawerOpen);
          }}
        >
          <ChatBubbleOutlineIcon />
          <Drawer anchor="right" open={isDrawerOpen}>
            <Box p={2} width="50vh">
              <Messages />
            </Box>
          </Drawer>
        </IconButton>
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
