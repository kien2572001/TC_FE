import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchValue: string;
}

const initialState: SearchState = {
    searchValue: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});

export const { setSearchValue } = searchSlice.actions;

const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        // Add other reducers here
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
