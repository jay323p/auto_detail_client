import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  thisYearDates: [],
  nextYearDates: [],
  calendarId: '',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    SET_CALENDAR_DATES(state, action) {
      state.thisYearDates = action.payload.thisYearDates;
      state.nextYearDates = action.payload.nextYearDates;
      state.calendarId = action.payload.calendarId;
    },
  },
});

export const { SET_CALENDAR_DATES } = calendarSlice.actions;
export const selectThisYearDates = (state) => state.calendar.thisYearDates;
export const selectNextYearDates = (state) => state.calendar.nextYearDates;
export const selectCalendarId = (state) => state.calendar.calendarId;

export default calendarSlice.reducer;
