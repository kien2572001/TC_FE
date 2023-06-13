import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    filterValue: string;
}

const initialState: FilterState = {
    filterValue: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload;
        },
    },
});

export const { setFilterValue } = filterSlice.actions;

export default filterSlice.reducer;
