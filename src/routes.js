import Login from './pages/user/login/login'
import Register from './pages/user/register/register'
import RetrievePassword from './pages/user/retrievePassword/retrievePassword';
import Welcome from './pages/welcome/welcome'

// router类型组件
/**
 * @param {string} path - url路径，/开头
 * @param {boolean} exact - 路由精确匹配或者模糊匹配
 * @param {element} element - 导入的组件
 */

const routes = [
  {
    path: '/',
    exact: true,
    element: <Welcome />
  },
  {
    path: '/login',
    exact: true,
    element: <Login />
  },
  {
    path: '/register',
    exact: true,
    element: <Register />
  },
  {
    path: '/retrievePassword',
    exact: true,
    element: <RetrievePassword />
  },
];

export default routes;