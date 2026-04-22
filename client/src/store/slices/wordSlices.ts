import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WordUIState {

  currentPage: number;
  activeFilter: string; // 'all', 'B1', 'B2', 'C1'
  searchStore: string;
  highlightNewWord: string
}

const initialState: WordUIState = {

  currentPage: 1,
  activeFilter: 'all',
  searchStore: '',
  highlightNewWord: '',
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
      state.currentPage = 1;
    },
    setSearchStore: (state, action: PayloadAction<string>) => {
      state.currentPage = 1;
      state.searchStore = action.payload;
    },
    setHighlightNewWord: (state, action: PayloadAction<string>) => {
      state.highlightNewWord = action.payload;
    },
  },
});

export const { setCurrentPage, setActiveFilter, setSearchStore, setHighlightNewWord } = wordSlice.actions;
export default wordSlice.reducer;