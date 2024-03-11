import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
    phone: '',
    privilege: '',
    userId: '',
    activeOrders: [],
    archivedOrders: [],
  },
  emailVerified: false,
  isLoggedIn: false,
  page: 'Home',
  showNavModal: false,
  showSuccessMsg: false,
  showErrMsg: false,
  successMsg: '',
  errorMsg: '',
  homePageScrollGuide: 0,
  servicePageInfoGuide: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;

      if (action.payload === false) {
        state.user = {
          name: '',
          email: '',
          phone: '',
        };
      }
    },
    SET_PAGE(state, action) {
      state.page = action.payload;
    },
    SET_SHOW_NAV_MODAL(state, action) {
      state.showNavModal = action.payload;
    },
    SET_USER_INFO(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    SET_EMAIL_VERIFIED(state, action) {
      state.emailVerified = action.payload;
    },
    SET_ACTIVE_ORDERS(state, action) {
      state.user.activeOrders = action.payload;
    },
    SET_SUCCESS_MSG(state, action) {
      state.showSuccessMsg = action.payload.showSuccessMsg;
      state.successMsg = action.payload.successMsg;
    },
    SET_ERROR_MSG(state, action) {
      state.showErrMsg = action.payload.showErrMsg;
      state.errorMsg = action.payload.errorMsg;
    },
    SET_HOME_PAGE_SCROLL_GUIDE(state, action) {
      state.homePageScrollGuide = action.payload;
    },
    SET_SERVICE_PAGE_INFO_GUIDE(state, action) {
      state.servicePageInfoGuide = action.payload;
    },
  },
});

export const {
  SET_LOGIN,
  SET_PAGE,
  SET_SHOW_NAV_MODAL,
  SET_USER_INFO,
  SET_EMAIL_VERIFIED,
  SET_ACTIVE_ORDERS,
  SET_SUCCESS_MSG,
  SET_ERROR_MSG,
  SET_HOME_PAGE_SCROLL_GUIDE,
  SET_SERVICE_PAGE_INFO_GUIDE,
} = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectPage = (state) => state.auth.page;
export const selectUser = (state) => state.auth.user;
export const selectEmailVerified = (state) => state.auth.emailVerified;
export const selectShowNavModal = (state) => state.auth.showNavModal;
export const selectShowSuccessMsg = (state) => state.auth.showSuccessMsg;
export const selectShowErrMsg = (state) => state.auth.showErrMsg;
export const selectSuccessMsg = (state) => state.auth.successMsg;
export const selectErrorMsg = (state) => state.auth.errorMsg;
export const selectHomePageScrollGuide = (state) =>
  state.auth.homePageScrollGuide;
export const selectServicePageInfoGuide = (state) =>
  state.auth.servicePageInfoGuide;

export default authSlice.reducer;
