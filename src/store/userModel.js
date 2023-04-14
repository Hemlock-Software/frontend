import { action, createStore, thunk } from 'easy-peasy';
import { login } from '../services/api';

const userModel = {
  username: "123",
  password: "123",
  setUsername: action((state, payload) => {
    state.username = payload;
  }),
  setPassword: action((state, payload) => {
    state.password = payload;
  }),
  login: thunk(async (actions, _payload, { getState }) => {
    const { username, password } = getState();
    const user = { username, password };
    const response = await login(user);
    console.log(response);
  }),
};

const store = createStore({
  user: userModel,
});

export default store;