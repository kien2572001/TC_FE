import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/slices/searchSlice';
import filterReducer from './features/slices/filterSlice';

const store = configureStore({
    reducer: {
        search: searchReducer,
        filter: filterReducer
        // Add other reducers here
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
