import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

//it is an Action, here when fetchProducts is called, then the api will be invoked and the 1st argument is the name of the asyncThunk
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.products, "from fetchProducts")
        return data.products;
    }
    catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
});

const fetchProductsSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        data: [],
        isError: false, 
        searchTerm:'',
        filteredData:[]
    },
    reducers:{
        setSearchTerm(state,action){
            state.searchTerm=action.payload
            state.filteredData = state.data?.filter(product =>
                product?.title.toLowerCase().startsWith(state.searchTerm?.toLowerCase())
            );
            
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true
        })
    }
})
export const {setSearchTerm} =fetchProductsSlice.actions;
export default fetchProductsSlice.reducer;