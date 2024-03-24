import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slice/cart/reducer'
import searchReducer from './slice/search/searchReducer'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
    },
})

export default store
