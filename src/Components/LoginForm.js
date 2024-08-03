import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid'; 
import Paper from '@mui/material/Paper';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const onSubmit = () => {
    dispatch(login(username, password));
    if(token){
    navigate('/products');
    }
    if(username !== "emilys" || password !== "emilyspass"){
      alert("Invalid Username or password")
    }
  };

  return (
    <Grid>
      <Paper elevation={10} sx={{padding: "20px", width:'380px',height:'50vh', margin:'150px auto'}}>
       
    <Grid align={'center'}>
    <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Enter Username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Enter Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={errors.password?.message}
          margin="normal"
          fullWidth
          
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{margin:'20px 0px'}} onClick={() => setIsLogin(!isLogin)}>
          {isLogin === 'loading' ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Grid>
    </Paper>
    </Grid>
  );
};

export default LoginForm;
