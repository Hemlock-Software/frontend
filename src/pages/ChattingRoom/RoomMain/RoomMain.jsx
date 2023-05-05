import * as React from 'react';
import {
  Grid,
  Divider,
  Box,
  Chip,
  Avatar,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import './RoomMain.scss';
import { useNavigate } from 'react-router-dom';
import RoomCreate from '../RoomCreate/RoomCreate';

function stringToColor(string) {
  let hash = 0;
  let i, chr;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  hash = hash & 0xffffff; // 修改这行代码
  hash = Math.abs(hash);
  const r = (hash % 255);
  const g = ((hash >> 8) % 255);
  const b = ((hash >> 16) % 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function stringAvatar(name) {
  let abbr;
  let bgcolor;

  // 判断是否为中文
  if (/^[\u4e00-\u9fa5]+$/.test(name)) {
    abbr = name.substring(0, 1);
    bgcolor = stringToColor(abbr);
  } else {
    abbr = name.substring(0, 2);
    bgcolor = stringToColor(name);
  }

  return {
    sx: {
      bgcolor,
      width: '40px',
      height: '40px',
      mr: 2,
    },
    children: abbr,
  };
}

function ChatMessage(props) {
  const { message } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Avatar {...stringAvatar(message.user)} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body1">
          {message.user}
        </Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '16px',
            px: 2,
            py: 1,
            mt: 1,
            maxWidth: '70%',
          }}
        >
          <Typography variant="body2">{message.text}</Typography>
        </Box>
      </Box>
    </Box>
  );
}


function RoomMain() {
  const datalist = {
    name: 'IEeya',
    mail: '3200103483@zju.edu.cn',
    room: 'Chatting room 1',
  };
  const navigate = useNavigate();
  const [isListScrollable, setIsListScrollable] = React.useState(false);
  const [ChattingInfor, setChattingInfor] = React.useState(datalist);
  const chatRooms = Array.from({ length: 5 }, (_, i) => `Chatting Room ${i + 1}`);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleCreateRoom(){
    console.log("Ct")
    navigate("/room/create")
  }

  const messages = [
    {
      user: 'Alice',
      text: 'Hello, Bob!',
    },
    {
      user: 'Bob',
      text: 'Hi, Alice!',
    },
  ];

  const handleListScroll = (event) => {
    // 判断List组件是否需要滚动
    setIsListScrollable(event.target.scrollHeight > event.target.clientHeight);
  };

  return (
    <div>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110px'}}>
            <Box sx={{ 
              backgroundColor: '#f3f3f3',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
              justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center',}}>
              <Avatar {...stringAvatar(ChattingInfor.name)}/>
                <div>
                  <Typography variant="h6">
                    {ChattingInfor.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '8px' }}>
                    {ChattingInfor.mail}
                  </Typography>
                </div>
              </div>
            </Box>
          </Box>


          <Grid>
            <Divider orientation="vertical" sx={{ borderStyle: 'dashed', borderWidth: 3 }} />
          </Grid>


          <Box sx={{ 
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            justifyContent: 'center',
          }}>
            <div style={{ height: '500px', overflow: 'auto' }}>
              <List 
                onScroll={handleListScroll} // 监听List组件的滚动事件
                sx={{
                  height: isListScrollable ? '100%' : 'auto', // 动态设置List组件的高度
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '20px',
                  },
                }}
              >
                {chatRooms.map((item) => (
                  <ListItem key={item}>
                    <ListItemButton>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                      <ListItemText primary={item}/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </Box>

          <Grid>
            <Divider orientation="vertical" sx={{ borderStyle: 'dashed', borderWidth: 3 }} />
          </Grid>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Create New Chatting Room" onClick={handleClickOpen}/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Enter Chatting Room" />
              </ListItemButton>
            </ListItem>
          </List>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a new chatting room</DialogTitle>
            <DialogContent>
              <RoomCreate />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>close</Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/* <Grid>
          <Divider orientation="vertical" sx={{ borderStyle: 'dashed', borderWidth: 3 }} />
        </Grid> */}

{/* 右侧栏 */}
        <Grid item xs={9} sx={{ backgroundColor: '#deefe9',  display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '110px',
            position: 'relative', // 让子组件可以使用绝对定位
          }}>
            <Box sx={{ 
              backgroundColor: '#f3f3f3',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              width: '95%',
              justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Chip label="Now Chatting" color="primary" sx={{mr: 2}}/>
                <Avatar {...stringAvatar(ChattingInfor.room)}/>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">{ChattingInfor.room}</Typography>
                  <Typography variant="body1" sx={{ fontSize: '8px' }}>belonger: {ChattingInfor.name}</Typography>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mr: 2}}>
                  <IconButton sx={{ mr: 1}}>
                    <FolderOpenIcon />
                  </IconButton>
                  <IconButton sx={{ mr: 1}}>
                    <PersonAddAltIcon />
                  </IconButton>
                  <IconButton sx={{ mr: 1}}>
                    <SettingsIcon />
                  </IconButton>
                </Box>
              </div>
            </Box>
          </Box>
          {/* 消息栏 */}
          <Box sx={{ p: 2, flex: 1, height: 0 }}>
            <Box sx={{ height: 'calc(100vh - 250px - 50px)', overflow: 'auto' }}>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </Box>
          </Box>
          {/* 输入框 */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f3f3f3',
            p: 2,
            height: '50px',
          }}>
            <TextField
              label="Type your message"
              variant="outlined"
              fullWidth
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary">
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default RoomMain;