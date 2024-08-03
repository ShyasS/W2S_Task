import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productDetails: {},
  },
  reducers : {
    getProduct : (state, action) => {
      state.products = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetails = action.payload;
    }
  } 
});

export const {getProduct, getProductDetail } = productsSlice.actions;

export const fetchProduct = (token) => async(dispatch) => {
  try {
    const response = await axios.get('https://dummyjson.com/products', {
      headers: { Authorization: token },
    });
    dispatch(getProduct(response.data.products));
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

export const fetchProductId = (id) => async(dispatch) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log(response.data)
    dispatch(getProductDetail(response.data));
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

export default productsSlice.reducer;
