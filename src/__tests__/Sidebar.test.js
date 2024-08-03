import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar1 from '../Components/Sidebar1';
import { fetchProduct, fetchProductId } from '../features/productsSlice';
import { logout } from '../features/authSlice';

const mockStore = configureStore();

describe('Sidebar1', () => {
  let store;
  let mockFetchProduct;
  let mockFetchProductId;
  let mockLogout;

  beforeEach(() => {
    mockFetchProduct = jest.fn();
    mockFetchProductId = jest.fn();
    mockLogout = jest.fn();

    store = mockStore({
      products: { products: [
        { id: '1', images: ['image1.jpg'], title: 'Product 1', price: '$10', category: 'Category 1' },
      ] },
    });
    
    store.dispatch = jest.fn().mockImplementation((action) => {
      if (action.type === fetchProduct.toString()) {
        return mockFetchProduct();
      }
      if (action.type === fetchProductId.toString()) {
        return mockFetchProductId(action.payload);
      }
      if (action.type === logout.toString()) {
        return mockLogout();
      }
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <Sidebar1 />
        </Router>
      </Provider>
    );

  it('should render the sidebar with the correct elements', () => {
    renderComponent();
    expect(screen.getByText('Products App')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('should handle product reviews modal', async () => {
    renderComponent();
    const reviews = screen.getByRole('button', { name: /view reviews/i });
    expect(reviews).toBeInTheDocument();
  });

  it('should call handleLogout function', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });
});
