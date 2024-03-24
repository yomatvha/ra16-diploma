import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    form: { size: null, count: 1 },
    itemsInCart: [],
    userForm: { phone: '', address: ''},
    submitForm: {
        owner: {
            phone: '',
            address: '',
        },
        items: []
    },
    refreshPage: { refresh: true },
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        form: { size: null, count: 1 },
        itemsInCart: [],
        userForm: { phone: '', address: ''},
        submitForm: {
            owner: {
                phone: '',
                address: '',
            },
            items: []
        },
        refreshPage: { refresh: true },
    },
    reducers: {
        setItemInCart: (state, action) => {
            state.itemsInCart.push(action.payload);
            
        },
        deleteItemFromCart: (state, action) => {
            console.log(action.payload);
            state.itemsInCart = state.itemsInCart.filter(
                item => item.id !== action.payload.id 
                // && item.size !== action.payload.size
            )
        },
        cartChangeForm: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },
        changeUserForm: (state, action) => {
            state.userForm = { ...state.userForm, ...action.payload };
        },
        submitCart: (state) => {
            state.submitForm = {
                owner: {
                    phone: state.userForm.phone,
                    address: state.userForm.address,
                },
                items: state.itemsInCart.map((item) => (
                    { id: item.id, price: item.totalPrice, count: item.count }
                ))
            }
        },
        refreshPage: (state, action) => {
            state.refreshPage = { ...state.refreshPage, ...action.payload }
        },
        clearCart: (state) => {
            state.itemsInCart = initialState.itemsInCart;
            state.userForm = initialState.userForm;
            state.submitForm = initialState.submitForm;
        },
    }
})

export const { 
    setItemInCart, 
    deleteItemFromCart, 
    cartChangeForm,
    changeUserForm,
    submitCart,
    refreshPage,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer
