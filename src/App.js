import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes'
import './mock/mock'
import MyAppBar from './components/Appbar'

import { StoreProvider } from 'easy-peasy';
import { globalModel } from './store/globalStoreModel';

function App () {
  return (
    <StoreProvider store={globalModel}>
      <div>
        <Router>
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
        </Router>
      </div>
    </StoreProvider>
  )
}

export default App
