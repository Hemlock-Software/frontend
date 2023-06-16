// 圆形头像图标
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Stack from '@mui/material/Stack'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import '../RoomSetting/RoomSetting.scss'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import * as React from 'react'
import InputBase from '@mui/material/InputBase'
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import { useCookies } from 'react-cookie'
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';

function RoomSetting () {
  const ariaLabel = { 'aria-label': 'description' }
  const [Cookie] = useCookies(['E-mail'])
  const {
    roomMemberNum,
    roomMemberInfo,
    checkMoreFlag,
    pinChatLoading,
    muteLoading,
    searchFlag,
    displayAll,
    searchNameValue,
    roomName,
    roomID,
    nickName,
    loginUserNickname,
    loginUserEmail,
    roomOwner,
    // roomMemberInfoHandled,
  } = useStoreState((state) => state.roomSettingModel)

  const {
    setState,
    handleRoomMemberInfo,
    quitRoom,
    dismissRoom,
    removeMember,
  } = useStoreActions((actions) => actions.roomSettingModel)

  const {
    roomInfor,
  } = useStoreState((state) => state.roomMainModel)

  const {
    getRoomList,
    getRoomInfo,
    setExtraState,
  } = useStoreActions((state) => state.roomMainModel)

  function memberSort(members, ownerMail) {
    const sortedMembers = members.map(member => ({
      name: member.nickname,
      mail: member.mail
    }));

    sortedMembers.sort((a, b) => {
      if (a.mail === ownerMail) {
        return -1; // a在b之前
      }
      if (b.mail === ownerMail) {
        return 1; // b在a之前
      }
      return 0; // 保持原有顺序
    });

    return sortedMembers;
  }
  //依赖项
  useEffect(() => {
    setState({
      roomID: roomInfor.id,
      roomName: roomInfor.name,
      roomMemberInfo: memberSort(roomInfor.members, roomInfor.owner.mail),
      roomMemberNum: roomInfor.members.length,
      checkMoreFlag: roomMemberNum > 18 ? true : false,
      loginUserEmail:Cookie['E-mail'].email,
      loginUserNickname:Cookie['E-mail'].nickname,
      roomOwner:roomInfor.owner,
    })
  }, [roomInfor])

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAvatarClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const open = Boolean(anchorEl);

  function searchName (name) {
    const pattern = new RegExp(`^.*${searchNameValue.split('').join('.*')}.*$`)
    return pattern.test(name)
  }

  const handleKickFromRoom = (event, userMail) => {
    removeMember({
      id: roomID,
      mail: userMail,
    }).then((response) => {
      if (response.status === 200){
        getRoomInfo({id: roomID, flag: false})
      }
      else{
        alert(response.data)
      }
    })
  }

  const handleRoomLeave = (event, userMail) => {
    if(userMail != roomOwner.mail){
      quitRoom(roomID).then((response) => {
        if (response.status === 200){
          //成功加入
          alert("You have successfully left the room!")
          getRoomList()
          setExtraState({roomSettingOpen: false})
          setExtraState({roomInfor: null})
        }
        else{
          alert(response.data)
        }
      })
    }
    else{
      dismissRoom(roomID).then((response) => {
        if (response.status === 200){
          //成功加入
          alert("You have successfully deleted the room!")
          getRoomList()
          setExtraState({roomSettingOpen: false})
          setExtraState({roomInfor: null})
        }
        else{
          alert(response.data)
        }
      })
    }
  }

  function stringToColor (string) {
    let hash = 0
    let i, chr
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i)
      hash = ((hash << 5) - hash) + chr
      hash |= 0
    }
    hash = hash & 0xffffff // 修改这行代码
    hash = Math.abs(hash)
    const r = (hash % 255)
    const g = ((hash >> 8) % 255)
    const b = ((hash >> 16) % 255)
    return `rgb(${r}, ${g}, ${b})`
  }

  function stringAvatar (name) {
    let abbr
    let bgcolor

    if(name===''){
      name='anonymous'
    }
    // 判断是否为中文
    if (/^[\u4e00-\u9fa5]+$/.test(name)) {
      abbr = name.substring(0, 1)
      bgcolor = stringToColor(abbr)
    } else {
      abbr = name.substring(0, 2)
      bgcolor = stringToColor(name)
    }

    return {
      sx: {
        bgcolor,
      },
      children: abbr,
    }
  }


  // 限制给定的群成员名称的长度，防止换行或扩充
  function limitLength (name) {
    if(name===''){
      name='anonymous'
    }
    let maxLength = 3
    if (/^[\u4e00-\u9fa5]+$/.test(name)) {
      maxLength = 2
    } else {
      maxLength = 5
    }
    let length = name.length
    if (length > maxLength) {
      return name.substring(0, maxLength) + "..."
    }
    return name
  }

  return (
    <div>
      <Card sx={{ width: 600, overflow: 'auto', height: 750 }}>
        <CardContent sx={{ overflow: 'auto' }}>
          <div className='roomSetting' style={{ }}>
            Room Settings
          </div>
          <Stack direction="row" spacing={2}>
            <ListItem>
              <ListItemAvatar>
                <Avatar {...stringAvatar(roomName)} variant="square" style={{ borderRadius: '10px'
               }} onClick={handleAvatarClick}>
                  {/* 用 src=''来表示群头像 */}
                </Avatar>
              </ListItemAvatar>
              <div style={{ textAlign: 'center', marginTop: '0px' }}>
                {roomName}
              </div>
            </ListItem>
          </Stack>
          <br></br>
          <Divider></Divider>
          <br></br>
          <div className='parent'>
            <Stack direction="row" spacing={2}>
              <Stack direction='column' spacing={1}></Stack>
              <div style={{  textAlign: 'center', marginTop: '0px' }}>
                {'Room Members: ' + roomMemberNum + ' people'}
              </div>
              <Stack direction="row" spacing={2}>
                <div className='child' style={{ display: 'flex' }}>
                  <div style={{ flexGrow: 1 }}>
                    {searchFlag ? (
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        onClick={() =>
                          setState({
                            searchFlag: !searchFlag,
                            displayAll: true,
                          })
                        }
                      >
                        <div style={{ height: 0, display: 'flex', alignItems: 'center',  }}>
                          Cancel
                        </div>
                      </IconButton>
                    ) : (
                      <div style={{ height: 34, display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          onClick={() => setState({ searchFlag: !searchFlag })}
                        >
                          <SearchIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  {searchFlag ? (
                    <Paper
                      component="form"
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 200,
                        height: 30,
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ 'aria-label': 'search google maps' }}
                        placeholder="Search name"
                        onChange={(e) =>
                          setState({
                            searchNameValue: e.target.value,
                          })
                        }
                      />
                      <IconButton
                        type="button"
                        sx={{ p: '10px' }}
                        aria-label="search"
                        onClick={() =>
                          setState({
                            displayAll: false,
                          })
                        }
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  ) : null}
                </div>
              </Stack>

            </Stack>
          </div>
          <br></br>
          {displayAll ?
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
            {roomMemberInfo.slice(0, 21).map((item, index) => (
            <div key={item.mail} style={{ display: 'flex', flexBasis: '10%', flexDirection: 'column', margin: '15px', alignItems: 'center', flexBasis: '10%', flexGrow: 0 }}>
              <Avatar {...stringAvatar(item.name)} variant="square" style={{ borderRadius: '10px' ,cursor:'pointer'}}
                onClick={(event)=>handleAvatarClick(event,item.mail)}>
              </Avatar>
              <Popover
                open={open && selectedUser === item.mail}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transfororigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {/* 将这里的内容替换为用户信息卡片的具体内容 */}
                <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ marginLeft: '8px' }}>
                      <h3>{item.name===''?'anonymous':item.name}</h3>
                      <p>{item.mail}</p>
                    </div>
                  </div>
                  <div style={{ marginRight: '8px' }}>
                    <Avatar {...stringAvatar(item.name)} alt={item.name} />
                  </div>
                </div>
                <Divider></Divider>
                {loginUserEmail===roomOwner.mail?(
                  loginUserEmail!==item.mail?
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton color="primary" typography="body2" style={{ fontSize: '20px', color: 'red',  }}
                      onClick={(event)=>handleKickFromRoom(event,item.mail)}
                    >
                      Kick from chat room
                    </IconButton>
                  </div>:
                  null):
                null}
              </Popover>
                <div style={{  textAlign: 'center', marginTop: '10px' }} >
                  {limitLength(item.name)}
                </div>
            </div>
            // 设置每个元素的宽度为14.28%，即100/7%
          ))}</div> :
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>{roomMemberInfo.slice(0, 21).filter(member => searchName(member.name)).map((item, index) => (
              <div key={item.mail} style={{ display: 'flex', flexBasis: '10%', flexDirection: 'column', margin: '15px', alignItems: 'center', flexBasis: '10%', flexGrow: 0 }}>
                <Avatar {...stringAvatar(item.name)} variant="square" style={{ borderRadius: '10px' ,cursor:'pointer'}}
              onClick={(event)=>handleAvatarClick(event,item.mail)}>
              </Avatar>
              <Popover
              open={open && selectedUser === item.mail}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transfororigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              >
              {/* 将这里的内容替换为用户信息卡片的具体内容 */}
              <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ marginLeft: '8px' }}>
                    <h3>{item.name===''?'anonymous':item.name}</h3>
                    <p>{item.mail}</p>
                  </div>
                </div>
              <div style={{ marginRight: '8px' }}>
          <Avatar {...stringAvatar(item.name)} alt={item.name} />
          </div></div>
          <Divider></Divider>
          {loginUserEmail===roomOwner.mail?(loginUserEmail!==item.mail?<div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary" typography="body2" style={{ fontSize: '20px', color: 'red',  }}
              onClick={(event)=>handleKickFromRoom(event,item.mail)}
            >
              Kick from chat room
            </IconButton>
          </div>:null):null}
          </Popover>
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                  {limitLength(item.name)}
                </div>
              </div>
              // 设置每个元素的宽度为14.28%，即100/7%
            ))}</div>}
          {/* 如果人数超过18，则显示'check more'按钮 */}
          {
            checkMoreFlag ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton color="primary" typography="body2" style={{ fontSize: '12px' }}>Show more</IconButton>
            </div> : null
          }
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              Chat room nickname
            </Typography>} />
            <TextField
              id="standard-password-input"
              autoComplete="current-password"
              variant="standard"
              sx={{ alignSelf: "flex-start", justifyContent: "flex-start" }}
              value={nickName}
              onChange={(e) => setState({
                nickName: e.target.value,
              })}
            />

          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              Pin chat
            </Typography>} />
            <FormControlLabel
              sx={{
                display: 'block',
              }}
              control={
                <Switch
                  checked={pinChatLoading}
                  onChange={() => setState({
                    pinChatLoading: !pinChatLoading
                  })}
                  name="loading"
                  color="primary"
                />
              }
            />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              Mute notifications
            </Typography>} />
            <FormControlLabel
              sx={{
                display: 'block',
              }}
              control={
                <Switch
                  checked={muteLoading}
                  onChange={() => setState({
                    muteLoading: !muteLoading
                  })}
                  name="loading"
                  color="primary"
                />
              }
            />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              Room label
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              Room type
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          {/* <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br><Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br><Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br><Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br><Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br><Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br>
          <Stack direction="row" spacing={2} sx={{ height: "50%", pt: 0, pb: 1 }}>
            <Stack direction='column' spacing={1}></Stack>
            <ListItemText primary={<Typography variant="body1" style={{  }}>
              test block
            </Typography>} />
          </Stack>
          <Divider></Divider>
          <br></br> */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary" typography="body2" style={{ fontSize: '20px', color: 'red',  }}
              onClick={(event)=>handleRoomLeave(event, loginUserEmail)}
            >
              {roomOwner.mail===loginUserEmail?'Dismiss Group Chat':'Exit Group Chat'}
              </IconButton>
          </div>
        </CardContent>
      </Card >
    </div >
  )
}

export default RoomSetting
