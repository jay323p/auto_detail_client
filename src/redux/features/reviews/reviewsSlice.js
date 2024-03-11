import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allReviews: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    SET_ALL_REVIEWS(state, action) {
      state.allReviews = action.payload;
    },
  },
});

export const { SET_ALL_REVIEWS } = reviewsSlice.actions;
export const selectAllReviews = (state) => state.reviews.allReviews;

export default reviewsSlice.reducer;
