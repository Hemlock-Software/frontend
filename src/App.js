import './App.css'
import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import routes, {protectedroutes} from './routes'
import './mock/mock'
import MyAppBar from './components/Appbar'

import { StoreProvider } from 'easy-peasy';
import { globalModel } from './store/globalStoreModel';

import PrivateRoutes from './PrivateRoutes'


function App() {
  return (
    <StoreProvider store={globalModel}>
      <div>
        <HashRouter>
          <MyAppBar />
          {/* router 界面 */}
          <Routes>
            <Route element = {<PrivateRoutes/>}>
              {protectedroutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                    exact={route.exact}
                  />
              ))}
            </Route>
            {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  exact={route.exact}
                />
            ))}
          </Routes>
        </HashRouter>
      </div>
    </StoreProvider>
  )
}

export default App
