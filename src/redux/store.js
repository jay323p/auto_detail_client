import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import accountReducer from '../redux/features/account/accountSlice';
import calendarReducer from '../redux/features/calendar/calendarSlice';
import contactsReducer from '../redux/features/contacts/contactsSlice';
import reviewsReducer from '../redux/features/reviews/reviewsSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  calendar: calendarReducer,
  contacts: contactsReducer,
  reviews: reviewsReducer,
});

const persistConfig = {
  key: 'root1',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
