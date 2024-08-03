import productsReducer, { getProduct, getProductDetail } from '../features/productsSlice';

describe('productsSlice reducers', () => {
  it('should handle getProduct', () => {
    const initialState = { products: [], productDetails: {} };
    const action = getProduct([{ id: 1, title: 'Product 1' }]);
    const state = productsReducer(initialState, action);
    expect(state.products).toEqual([{ id: 1, title: 'Product 1' }]);
  });

  it('should handle getProductDetail', () => {
    const initialState = { products: [], productDetails: {} };
    const action = getProductDetail({ id: 1, title: 'Product 1' });
    const state = productsReducer(initialState, action);
    expect(state.productDetails).toEqual({ id: 1, title: 'Product 1' });
  });
});
