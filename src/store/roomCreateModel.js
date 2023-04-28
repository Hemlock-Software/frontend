import { action, thunk } from 'easy-peasy';

export const roomCreateModel = {
  roomID: "",

// 定义一些action函数，state有点像this的作用，调用本类
  setState: action((state, payload) => {
    state = Object.assign(state, payload)
  }),
};
