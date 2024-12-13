import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const itemIndex = state.products.find((item) => item.id === newItem.id)
            if (itemIndex) {
                itemIndex.quantity++;
                itemIndex.totalPrice += newItem.price
            }
            else {
                state.products.push({
                    id: newItem.id,
                    name: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.images[0]
                })

            }
            state.totalPrice += newItem.price;
            state.totalQuantity++;
        },
        removeItem(state, action) {
            const id = action.payload.id;
            const itemToRemove = state.products.find(item => item.id === id);
            if (itemToRemove) {
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.totalPrice;
                state.products = state.products.filter(item => item.id !== id);
            }
        },

        deleteItem(state, action) {
            const id = action.payload.id;
            const itemToDelete = state.products.find(item => item.id === id);
            if (itemToDelete) {
                state.products = state.products.filter(item => item.id !== id);

            }
        },
        removeAllItems(state){
            state.products=[];
            state.totalQuantity= 0;
            state.totalPrice= 0;
        }



    }
})

export const { addItem, removeItem, deleteItem,removeAllItems } = cartSlice.actions;
export default cartSlice.reducer