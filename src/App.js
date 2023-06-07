import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import routes from './routes'
import './mock/mock'
import MyAppBar from './components/Appbar'

import { StoreProvider } from 'easy-peasy';
import { globalModel } from './store/globalStoreModel';

function App() {
  return (
    <StoreProvider store={globalModel}>
      <div>
        <HashRouter>
          <MyAppBar />
          {/* router 界面 */}
          <Routes>
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
