import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => {// se crea la variable, el cual contiene la accion, se exporta y se envia en este caso al Home
            return action.payload
        }
    }
})

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
