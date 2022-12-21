import { Typography, Box, Paper, Stack, IconButton } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

const Messages = () => {
  return (
    <div>
      <Box>
        <Typography variant="h5">Chats</Typography>
      </Box>
      <Stack height="80vh" gap={3} p={2}>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
        <Box>
          <Paper>
            Hehes hdddddddddddddddd dhdddddddddddddddddddddddddddddddddddddddddd
            ddhhdhddddddddddddddddddddddd
          </Paper>
        </Box>
      </Stack>
      <Box>
        <input
          placeholder="Type here..."
          style={{
            flex: 1,
            borderRadius: '21px',
            padding: '12px',
            outlineWidth: 0,
          }}
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default Messages;
