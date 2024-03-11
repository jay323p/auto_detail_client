import axios from 'axios';

// GET CALENDAR
export const getCalendarDates = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/calendar/getCalendar',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// UPDATE CALENDAR TO TODAY
export const updateCalendarStartingDate = async (calendarId) => {
  const response = await axios.post(
    'http://localhost:5000/api/calendar/updateDateToToday',
    calendarId,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// INIT CALENDAR IF NONE & STARTING SERVICE
export const initCalendar = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/calendar/initCalendar',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// RESERVE TIME SLOT
export const reserveTimeSlotForUser = async (slot) => {
  const response = await axios.patch(
    'http://localhost:5000/api/calendar/reserveTimeSlot',
    slot,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// UNRESERVE TIME SLOT
export const unreserveTimeSlotForUser = async (slot) => {
  const response = await axios.patch(
    'http://localhost:5000/api/calendar/unreserveTimeSlot',
    slot,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};
