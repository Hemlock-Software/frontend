import { createStore } from 'easy-peasy';
import { userModel } from './userModel';

// 定义全局模型
const GlobalModel = {
  user: userModel, // 导入用户模型
};

// 创建 store
export const globalModel = createStore(GlobalModel);