// 圆形头像图标
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { createTheme, Table } from '@mui/material'
import { deepOrange, green, blue } from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import { useStoreActions, useStoreState } from 'easy-peasy'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import '../RoomSetting/RoomSetting.scss'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'

import InputBase from '@mui/material/InputBase'

function RoomSetting () {
  const ariaLabel = { 'aria-label': 'description' }
  const {
    roomMemberNum,
    roomMemberInfo,
    checkMoreFlag,
    pinChatLoading,
    muteLoading,
    searchFlag,
    displayAll,
    searchNameValue,
    // roomMemberInfoHandled,
  } = useStoreState((state) => state.roomSettingModel)

  const {
    setState,
    handleRoomMemberInfo,
  } = useStoreActions((actions) => actions.roomSettingModel)

  // -1表示没找到
  function searchName (name) {
    let i = 0
    for (i = 0; i < roomMemberNum; i++) {
      if (roomMemberInfo[i].name === name) {
        return name
      }
    }
    return ''
  }

  // 依赖项为群人数，群人数变化，可能会超过21
  useEffect(() => {
    setState({
      checkMoreFlag: roomMemberNum > 21 ? true : false
    })
  }, roomMemberNum)

  return (
    <div>
      <Card sx={{ maxWidth: 520 }}>
        <br></br>
        <Stack direction="row" spacing={2}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[500], x: 50 }} variant="square">
                T
                {/* 用 src=''来表示群头像 */}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Room Name" />
          </ListItem>
        </Stack>
        <br></br>
        <Divider></Divider>
        <br></br>
        <Stack direction="row" spacing={2}>
          <Stack direction='column' spacing={1}></Stack>
          <ListItemText primary={'Room Member ' + roomMemberNum + ' people'} />
          {searchFlag ? <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, height: 30 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search google maps' }
              }
              placeholder="Search name"
              onChange={(e) => setState({
                searchNameValue: e.target.value
              })}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => setState({
              displayAll: false,
            })}><SearchIcon /></IconButton>
          </Paper> : null}
          {searchFlag ? <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => setState({
            searchFlag: !searchFlag,
            displayAll: true
          })}>
            {/* <input hidden accept="image/*" type="file" /> */}
            <div style={{ height: 0, display: 'flex', alignItems: 'center' }}>
              Cancle
            </div>
          </IconButton> : <div style={{ height: 34, display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => setState({
              searchFlag: !searchFlag,
            })}>
              {/* <input hidden accept="image/*" type="file" /> */}
              <SearchIcon />
            </IconButton>
          </div>}

        </Stack>

        {displayAll ? <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>{roomMemberInfo.slice(0, 21).map((item, index) => (
          // <div key={index} style={{ flexBasis: '10%', flexGrow: 0, margin: '10px', flexDirection: 'column', alignItems: 'center' }}>
          //   <Avatar sx={{ bgcolor: blue[500], x: 50 }} variant="square" >
          //     <Typography align="center" variant="subtitle2" sx={{ marginTop: '8px' }}>
          //       {/* {item.name} */}
          //     </Typography>
          //     {/* 用 src=''来表示群头像 */}
          //   </Avatar>
          //   <div style={{ textAlign: 'center', marginTop: 10 }}>
          //     {item.name}
          //   </div>
          // </div>
          <div style={{ display: 'flex', flexBasis: '10%', flexDirection: 'column', margin: '10px', alignItems: 'center', flexBasis: '10%', flexGrow: 0 }}>
            <Avatar sx={{ bgcolor: blue[500], x: 50 }} variant="square" >
              <Typography align="center" variant="subtitle2" sx={{ marginTop: '8px' }}>
                {/* {item.name} */}
              </Typography>
              {/* 用 src=''来表示群头像 */}
            </Avatar>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              {item.name}
            </div>
          </div>
          // 设置每个元素的宽度为14.28%，即100/7%
        ))}</div> :
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>{roomMemberInfo.slice(0, 21).filter(member => member.name === searchNameValue).map((item, index) => (
            // <div key={index} style={{ flexBasis: '10%', flexGrow: 0, margin: '10px', flexDirection: 'column', alignItems: 'center' }}>
            //   <Avatar sx={{ bgcolor: blue[500], x: 50 }} variant="square" >
            //     <Typography align="center" variant="subtitle2" sx={{ marginTop: '8px' }}>
            //       {/* {item.name} */}
            //     </Typography>
            //     {/* 用 src=''来表示群头像 */}
            //   </Avatar>
            //   <div style={{ textAlign: 'center', marginTop: 10 }}>
            //     {item.name}
            //   </div>
            // </div>
            <div style={{ display: 'flex', flexBasis: '10%', flexDirection: 'column', margin: '10px', alignItems: 'center', flexBasis: '10%', flexGrow: 0 }}>
              <Avatar sx={{ bgcolor: blue[500], x: 50 }} variant="square" >
                <Typography align="center" variant="subtitle2" sx={{ marginTop: '8px' }}>
                  {/* {item.name} */}
                </Typography>
                {/* 用 src=''来表示群头像 */}
              </Avatar>
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                {item.name}
              </div>
            </div>
            // 设置每个元素的宽度为14.28%，即100/7%
          ))}</div>}
        {/* 如果人数超过18，则显示'check more'按钮 */}
        {
          checkMoreFlag ? <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary" typography="body2" style={{ fontSize: '12px' }}>Check More</IconButton>
          </div> : null
        }
        <Divider></Divider>
        <br></br>
        <Stack direction="row" spacing={2}>
          <Stack direction='column' spacing={1}></Stack>
          <ListItemText primary='pin chat' />
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
          <ListItemText primary='Mute notifications' />
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton color="primary" typography="body2" style={{ fontSize: '20px', color: 'red' }}>Exit group chat</IconButton>
        </div>
      </Card >
    </div >
  )
}
export default RoomSetting