import React, {useEffect} from 'react';
import LoginForm from '../Components/LoginForm';
import { useSelector } from 'react-redux';
import ProductsPage from './ProductsPage';

const LoginPage = () => {
  const token = useSelector((state)=>state.auth.token);
  return (
    <div>
      {
        token ? <ProductsPage/> : <LoginForm/>
      }
    </div>
  );
};

export default LoginPage;
