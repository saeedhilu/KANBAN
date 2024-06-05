// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Store,{persistor} from './Redux/Store';
import Board from './Component/Board';
import Signup from './Component/Singup/Signup';
import Login from './Component/Login/Login';
import './Style/App.css';


const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <div className="app">
              
              <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Router>
        </DndProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
