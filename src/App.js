import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import './mock/mock'
import MyAppBar from './components/Appbar'

function App() {
  return (
    <div>
      <MyAppBar/>
      {/* router 界面 */}
      <Router>
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
  );
}

export default App;
