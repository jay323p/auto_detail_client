import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehiclePackageChosen: false,
  addOnsChosen: false,
  dateChosen: false,
  quickBook: undefined,
  order: { vehicle: '', package: '', addOns: [], ttlPrice: 0, date: '' },
  orders: [],
  archivedOrders: [],
  newOrderAdded: false,
  reviewHandling: {
    isReviewing: false,
    orderReviewing: {},
    orderReview: {},
  },
  ordersReviewed: {},
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    SET_VEHICLE_PACKAGE_CHOSEN(state, action) {
      state.vehiclePackageChosen = action.payload;
    },
    SET_ADD_ONS_CHOSEN(state, action) {
      state.addOnsChosen = action.payload;
    },
    SET_DATE_CHOSEN_BOOLEAN(state, action) {
      state.dateChosen = action.payload;
    },
    SET_ADD_ADD_ONS(state, action) {
      state.order.addOns = action.payload;
    },
    SET_PUSH_ADD_ADD_ONS(state, action) {
      state.order.addOns.push(action.payload);
    },
    SET_DATE(state, action) {
      state.order.date = action.payload;
    },
    SET_QUICK_BOOK(state, action) {
      //   if (state.order.quickBook === undefined) {
      //     state.order.quickBook = action.payload;
      //   } else if (action.payload === 'RESET') {
      //     state.order.quickBook = undefined;
      //     }
      state.quickBook = action.payload;
    },
    SET_ORDER(state, action) {
      state.order = {};
      state.order = action.payload;
    },
    SET_ORDERS(state, action) {
      state.orders = [];
      state.orders = action.payload;
    },
    SET_ARCHIVED_ORDERS(state, action) {
      state.archivedOrders = [];
      state.archivedOrders = action.payload;
    },
    SET_NEW_ORDER_ADDED(state, action) {
      state.newOrderAdded = action.payload;
    },
    SET_RESET_ORDER(state) {
      state.vehiclePackageChosen = false;
      state.addOnsChosen = false;
      state.dateChosen = false;
      state.order = {
        vehicle: '',
        package: '',
        addOns: [],
        ttlPrice: 0,
        date: '',
      };
    },
    SET_REVIEW_HANDLING(state, action) {
      state.reviewHandling = { ...state.reviewHandling, ...action.payload };
    },
    SET_ORDERS_REVIEWED(state, action) {
      state.ordersReviewed = { ...state.ordersReviewed, ...action.payload };
    },
  },
});

export const {
  SET_VEHICLE_PACKAGE_CHOSEN,
  SET_QUICK_BOOK,
  SET_ORDER,
  SET_ORDERS,
  SET_ARCHIVED_ORDERS,
  SET_ADD_ONS_CHOSEN,
  SET_DATE_CHOSEN_BOOLEAN,
  SET_DATE,
  SET_ADD_ADD_ONS,
  SET_PUSH_ADD_ADD_ONS,
  SET_RESET_ORDER,
  SET_NEW_ORDER_ADDED,
  SET_REVIEW_HANDLING,
  SET_ORDERS_REVIEWED,
} = accountSlice.actions;

export const selectVehiclePackageChosen = (state) =>
  state.account.vehiclePackageChosen;
export const selectAddOnsChosen = (state) => state.account.addOnsChosen;
export const selectDateChosen = (state) => state.account.dateChosen;
export const selectQuickBook = (state) => state.account.quickBook;
export const selectOrder = (state) => state.account.order;
export const selectOrders = (state) => state.account.orders;
export const selectArchivedOrders = (state) => state.account.archivedOrders;
export const selectNewOrderAdded = (state) => state.account.newOrderAdded;
export const selectReviewHandling = (state) => state.account.reviewHandling;
export const selectOrdersReviewed = (state) => state.account.ordersReviewed;

export default accountSlice.reducer;
