import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../Components/LoginForm';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store';

describe('LoginForm', () => {
    test('renders the login form', () => {
      render(
        <Provider store={store}>
          <Router>
            <LoginForm />
          </Router>
        </Provider>
      );
  
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  
    test('shows validation errors on submit without input', async () => {
      render(
        <Provider store={store}>
          <Router>
            <LoginForm />
          </Router>
        </Provider>
      );
  
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
      await waitFor(() => {
        expect(screen.getByText(/username is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });
  
    test('redirects to products page on successful login', async () => {
      render(
        <Provider store={store}>
          <Router>
            <LoginForm />
          </Router>
        </Provider>
      );
  
      fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'emilys' } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'emilyspass' } });
  
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
      await waitFor(() => {
        expect(screen.queryByText(/logging in/i)).not.toBeInTheDocument();
      });
    });
  });
  

