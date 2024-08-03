import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route  path="/" element={<LoginPage/>} />
          <Route  path="/products" element={<ProductsPage/>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

