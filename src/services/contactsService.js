import axios from 'axios';

// INIT CONTACTS
export const initContactsInfo = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/contacts/initContacts',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// ACKNOWLEDGE CONTACT UPDATES
export const acknowledgeContactUpdates = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/contacts/acknowledgeContactUpdates',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};
