import * as React from 'react';
import { useEffect } from 'react';
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
  Drawer,
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
import RoomCreate from '../RoomCreate/RoomCreate';
import RoomSetting from '../RoomSetting/RoomSetting';
import RoomEnter from '../RoomEnter/RoomEnter';
import { useStoreActions, useStoreState} from 'easy-peasy';
import {useCookies} from 'react-cookie';
import logo from '../../../assets/logo.png';

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
      <Avatar {...stringAvatar(message.sender.nickname)} />
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
          <Typography variant="body2">{message.content}</Typography>
        </Box>
      </Box>
    </Box>
  );
}


function RoomMain() {
  const [isListScrollable, setIsListScrollable] = React.useState(false);
  const {
    roomInfor,
    roomList,
    messages, 
    roomCreateOpen, 
    roomSettingOpen, 
    roomEnterOpen,
    inputMessage,
  } 
  = useStoreState((state) => state.roomMainModel)
  const { 
    setState,
    getRoomList,
    getRoomInfo,
  }
    = useStoreActions((actions) => actions.roomMainModel)

  const [Cookie] = useCookies(['E-mail']);

  useEffect(() => {
    getRoomList();
  }, []);

  const handleListScroll = (event) => {
    // 判断List组件是否需要滚动
    setIsListScrollable(event.target.scrollHeight > event.target.clientHeight);
  };

  var socket = null

  // const socket = new WebSocket('ws://localhost:15100/websocket/00000008/3052791719@qq.com');
  function enterRoom(id){
    getRoomInfo(id)
    socket = new WebSocket('ws://10.162.231.164:15100/websocket/'+ roomInfor.id + '/' + Cookie['E-mail'].email);

    socket.onmessage = (event) => {
      console.log('收到消息:', event.data);
      setState({messages: [...messages, event.data]})
    };
  
  } 

  async function send() {
    // 发送消息
    socket.send(inputMessage);
  }

  return (
    <div>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110px' }}>
            <Box sx={{
              backgroundColor: '#f3f3f3',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
              justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', }}>
                <Avatar {...stringAvatar("IEeya")} />
                <div>
                  <Typography variant="h6">
                    {Cookie['E-mail'].nickname}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '8px' }}>
                    {Cookie['E-mail'].email}
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
                {roomList.map((item) => (

                  <ListItem key={item.ID} onClick={() => enterRoom(item.ID)}>
                    <ListItemButton>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                      <ListItemText primary={item.name}/>
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
              <ListItemButton onClick={() => setState({ roomCreateOpen: true })} >
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Create New Chatting Room" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setState({ roomEnterOpen: true })}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Enter Chatting Room" />
              </ListItemButton>
            </ListItem>
          </List>

          <Dialog open={roomCreateOpen} onClose={() => setState({ roomCreateOpen: false })}>
            <DialogTitle>Create a new chat room</DialogTitle>
            <DialogContent>
              <RoomCreate />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setState({ roomCreateOpen: false })}>close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={roomEnterOpen} onClose={() => setState({ roomEnterOpen: false })}>
            <DialogTitle>Enter a new chat room</DialogTitle>
            <DialogContent>
              <RoomEnter />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setState({ roomEnterOpen: false })}>close</Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/* <Grid>
          <Divider orientation="vertical" sx={{ borderStyle: 'dashed', borderWidth: 3 }} />
        </Grid> */}

        {/* 右侧栏 */}
        <Grid item xs={9} sx={{ backgroundColor: '#deefe9', display: 'flex', flexDirection: 'column' }}>
          {
            roomInfor.id !== "123" ? (
              <React.Fragment>
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
                      <Avatar {...stringAvatar(roomInfor.name)}/>
                      <div style={{ flex: 1 }}>
                        <Typography variant="h6">{roomInfor.name}</Typography>
                        <Typography variant="body1" sx={{ fontSize: '8px' }}>Owner: {roomInfor.owner.nickname}</Typography>
                      </div>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mr: 2}}>
                        <Typography variant="p">Room ID: {roomInfor.id}</Typography>
                        <IconButton sx={{ mr: 1}}>
                          <FolderOpenIcon />
                        </IconButton>
                        <IconButton sx={{ mr: 1 }}>
                          <PersonAddAltIcon />
                        </IconButton>
                        <IconButton sx={{ mr: 1 }} onClick={() => setState({ roomSettingOpen: true })} >
                          <SettingsIcon/>
                        </IconButton>
                      </Box>
                      <Drawer
                        anchor={'right'}
                        open={roomSettingOpen}
                        onClose={() => setState({ roomSettingOpen: false })}
                      >
                        <RoomSetting />
                      </Drawer>
                    </div>
                  </Box>
                </Box>
                {/* 消息栏 */}
                <Box sx={{ p: 2, flex: 1, height: 0 }}>
                  <Box sx={{ height: 'calc(100vh - 250px - 50px)', overflow: 'auto' }}>
                    {
                      messages.length !== 0 ? (""): (
                        <center>
                          <Typography variant="caption" color="textSecondary" style={{ marginBottom: '20px'}}>-- Welcome to { roomInfor.name } , please enter a message to start chatting --</Typography>
                        </center>
                      )
                    }
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
                    text={inputMessage}
                    variant="outlined"
                    fullWidth
                    sx={{ mr: 1 }}
                    onChange={(e)=>setState({inputMessage: e.target.value})}
                  />
                  <Button variant="contained" color="primary" onClick={send}>
                    Send
                  </Button>
                </Box>
              </React.Fragment>
            ):(
              <div>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '100vh', textAlign: 'center', 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <Grid>
                      <img src={logo} alt="My Logo" style={{ width: '150px', height: '150px'}} />
                    </Grid>
                    <Grid>
                      <h1 style={{ fontFamily: '"Segoe UI Emoji"' , fontSize: '48px', fontColor: '#66CCFF'}}>
                        Welcome to HemLock Chat!
                      </h1>
                    </Grid>
                    <Typography variant="caption" color="textSecondary" style={{ marginBottom: '20px'}}>© 2023 The Website designed by G01</Typography>
                    <Grid>
                      Select a chat room from the chat room list.
                    </Grid>
                  </Grid>
              </div>
            )
          }
        </Grid>
      </Grid>
    </div>
  );
}
export default RoomMain;