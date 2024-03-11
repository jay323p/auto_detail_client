import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientContacts: [],
  newClients: false,
  qtyNewClients: 0,
  clientUpdates: false,
  qtyClientUpdates: 0,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    SET_INIT_CLIENT_CONTACTS(state, action) {
      state.clientContacts = action.payload.clientContacts;
      state.newClients = action.payload.newClients;
      state.qtyNewClients = action.payload.qtyNewClients;
      state.clientUpdates = action.payload.clientUpdates;
      state.qtyClientUpdates = action.payload.qtyClientUpdates;
    },
  },
});

export const { SET_INIT_CLIENT_CONTACTS } = contactsSlice.actions;
export const selectClientContacts = (state) => state.contacts.clientContacts;
export const selectNewClients = (state) => state.contacts.newClients;
export const selectQtyNewClients = (state) => state.contacts.qtyNewClients;
export const selectClientUpdates = (state) => state.contacts.clientUpdates;
export const selectQtyClientUpdates = (state) =>
  state.contacts.qtyClientUpdates;

export default contactsSlice.reducer;

// initially fetch all client contacts
// new client signup --> push basic client contact --> when client makes order, push orderRefId to active/archived orders in contact as well as their userProfile
