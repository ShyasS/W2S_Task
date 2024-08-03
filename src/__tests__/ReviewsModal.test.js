import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ReviewsModal from '../Components/ReviewsModal';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore();

describe('ReviewsModal', () => {
  let store;
  let productDetails;

  beforeEach(() => {
    productDetails = {
      title: 'Sample Product',
      images: ['sample-image-url.jpg'],
      reviews: [
        {
          reviewerName: 'John Doe',
          rating: 4,
          comment: 'Great product!',
          date: '2023-08-01',
        },
      ],
    };

    store = mockStore({
      products: { productDetails },
    });
  });

  const renderComponent = (open, handleClose, productId) =>
    render(
        <BrowserRouter>
      <Provider store={store}>
        <ReviewsModal open={open} handleClose={handleClose} productId={productId} />
      </Provider>
      </BrowserRouter>
    );

  it('should render product title and image', async () => {
    renderComponent(true, 'sample-product-id');

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByAltText('Product')).toHaveAttribute('src', 'sample-image-url.jpg');
  });

  it('should render customer reviews', async () => {
    renderComponent(true, jest.fn(), 'sample-product-id');

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Great product!')).toBeInTheDocument();
    });
  });

  it('should display no reviews message if there are no reviews', async () => {
    productDetails.reviews = [];
    store = mockStore({
      products: { productDetails },
    });

    renderComponent(true, jest.fn(), 'sample-product-id');

    expect(screen.getByText('No reviews available.')).toBeInTheDocument();
  });

  it('should call handleClose when the modal is closed', async () => {
    const handleClose = jest.fn();

    renderComponent(true, handleClose, 'sample-product-id');

    fireEvent.click(document.querySelector('.MuiBackdrop-root'));

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
