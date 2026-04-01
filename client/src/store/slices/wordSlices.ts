import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WordUIState {
  totalItems: number;
  currentPage: number;
  activeFilter: string; // 'all', 'B1', 'B2', 'C1'
}

const initialState: WordUIState = {
  totalItems: 0,
  currentPage: 1,
  activeFilter: 'all',
};

const wordSlice = createSlice({
  name: 'wordUI',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      console.log("setActiveFilter", action);
      localStorage.setItem('activeFilter', state.activeFilter);
      state.activeFilter = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setCurrentPage, setActiveFilter } = wordSlice.actions;
export default wordSlice.reducer;