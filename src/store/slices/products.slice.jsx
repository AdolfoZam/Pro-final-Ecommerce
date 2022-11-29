import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => dispatch => {
        dispatch(setIsLoading(true))
        axios.get("https://e-commerce-api.academlo.tech/api/v1/products")//proyecto la ruta de los productos
            .then(res => dispatch(setProducts(res.data.data.products)))//como acceder a informacion importante
            .finally(() => dispatch(setIsLoading(false)));//lo utilizo para el loading de carga de los productos
}

export const filterProductsthunk = (id) => (dispatch) => {//thunk para filtrar por categoria, el ID viene desde el onclick y se pasa al thunk y a este parametro
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then((res) => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterNamethunk = (inputSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productSlice.actions;// con el setProducts, exporto mediante el thunk, hacia productID

export default productSlice.reducer;
