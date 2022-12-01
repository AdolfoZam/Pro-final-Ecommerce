import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import { setIsLoading } from './isLoading.slice';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart:(state, action) =>{
            return state.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(["hola"])))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const createCartThunk = (productToCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/cart", productToCart, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkOutThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCart([])))
        .catch(error => console.log(error.response.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
