import axios from 'axios';

// POST SUBMIT ORDER
export const submitUserOrder = async (orderData) => {
  const response = await axios.post(
    'http://localhost:5000/api/order/submitOrder',
    orderData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// GET UNCOMPLETED USER ORDER
export const getUserOrders = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/order/getUserOrders',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// GET COMPLETED USER ORDER
export const getArchivedUserOrders = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/order/getCompletedUserOrders',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// DELETE USER ORDER
export const deleteUserOrderChosen = async (data) => {
  const response = await axios.patch(
    'http://localhost:5000/api/order/deleteOrder',
    data,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// UPDATE USER ORDER
export const updateUserOrderChosen = async (data) => {
  const response = await axios.patch(
    'http://localhost:5000/api/order/editOrder',
    data,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// GET ALL CUSTOMER ORDERS (ADMIN) -> returns completed and uncompleted customer orders
export const getEveryOrder = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/order/getAllCustomerOrders',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// GET SINGLE CUSTOMER ORDER (ADMIN)
export const getSingleCustomerOrder = async (data) => {
  const response = await axios.post(
    'http://localhost:5000/api/order/getSingleCustomerOrder',
    data,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};

// COMPLETE USER ORDER
export const completeUserOrder = async (data) => {
  const response = await axios.patch(
    'http://localhost:5000/api/order/completeUserOrder',
    data,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    return response.data;
  }
};
