import { createStore } from 'easy-peasy';
import { userModel } from './userModel'; 
import { roomMainModel} from './roomMainModel';
import { roomCreateModel} from './roomCreateModel';
import { roomSettingModel} from './roomSettingModel';
import { roomEnterModel } from './roomEnterModel';

// 定义全局模型
const GlobalModel = {
  user: userModel, // 导入用户模型
  roomMainModel: roomMainModel,
  roomCreateModel: roomCreateModel,
  roomSettingModel: roomSettingModel,
  roomEnterModel: roomEnterModel,
};

// 创建 store
export const globalModel = createStore(GlobalModel);