import axios from 'axios';

// INIT CONTACTS
export const initContactsInfo = async () => {
  const response = await axios.get(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/contacts/initContacts',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// ACKNOWLEDGE CONTACT UPDATES
export const acknowledgeContactUpdates = async () => {
  const response = await axios.get(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/contacts/acknowledgeContactUpdates',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};
