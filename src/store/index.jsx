import { configureStore } from '@reduxjs/toolkit'
import cartSlice  from './slices/cart.slice'
// import Purchases from '../pages/Purchases'
import isLoadingSlice from './slices/isLoading.slice'
import  productSlice  from './slices/products.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        product:productSlice,
        isLoading:isLoadingSlice,
        purchases:purchasesSlice,
        cart:cartSlice
    }
})
