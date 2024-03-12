import axios from 'axios';

// PRODUCTION === https://auto-detail-server-336dae0010f9.herokuapp.com
// DEVELOPMENT === http://localhost:5000

// REGISTER USER
export const registerUser = async (userData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/register',
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};
// REGISTER ADMIN
export const registerAdmin = async (userData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/registerAdmin',
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};

// LOGIN USER
export const loginUser = async (userData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/login',
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// LOGIN ADMIN
export const loginAdmin = async (userData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/loginAdmin',
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// RESET USER PASSWORD
export const resetUserPassword = async (userData) => {
  const response = await axios.patch(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/resetPassword',
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// FORGOT PASSWORD
export const userForgotPassword = async (userData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/forgotpass',
    userData
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// RESET PASSWORD FROM EMAIL LINK
export const resetPassFromEmailLink = async (userData, resetToken) => {
  const response = await axios.put(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/resetPasswordEmail/${resetToken}`,
    userData
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// SEND EMAIL VERIFICATION LINK
export const sendEmailVerificationLink = async (userData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/sendEmailVerification',
    userData
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// VERIFY USER EMAIL
export const verifyEmailLink = async (emailVerifyToken) => {
  const response = await axios.put(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/verifyEmail/${emailVerifyToken}`
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// GET EMAIL VERIFICATION
export const getEmailVerificationFromDb = async (userData) => {
  const response = await axios.post(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/getEmailVerification`,
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// GET CLIENT EMAIL VERIFICATION (ADMIN PROTECT)
export const getClientEmailVerificationFromDb = async (userData) => {
  const response = await axios.post(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/getClientEmailVerification`,
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// EDIT USER PROFILE
export const editUserProfile = async (userData) => {
  const response = await axios.patch(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/editUserProfile',
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// LOGOUT USER
export const logoutUser = async () => {
  try {
    const response = await axios.get(
      'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/logoutUser',
      { withCredentials: true }
    );

    if (response.statusText === 'OK') {
      console.log('registeration succesful');
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};

// GET USER LOGIN STATUS
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(
      'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/loginStatus',
      { withCredentials: true }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};
// GET ALL CUSTOMER CONTACT INFO
export const getAllUserContactInfo = async () => {
  try {
    const response = await axios.get(
      'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/getAllUserContactInfo',
      { withCredentials: true }
    );

    if (response.statusText === 'OK') {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};

// UPLOAD PHOTOS ADMIN
export const uploadGalleryPhotosAdmin = async (formData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/uploadPhotosAdmin',
    formData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// GET ALL PHOTOS FROM CLOUDINARY
export const getAllPhotosFromCloud = async () => {
  const response = await axios.get(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/getImagesFromCloud',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// GET PAGINATED GALLERY IMGS
export const getPaginatedGalleryImages = async (pageNum, filter) => {
  const response = await axios.get(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/getPaginatedGalleryImages?page=${pageNum}&filter=${filter}`,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// GET PAGINATED GALLERY IMGS
export const deleteImgFromCloudAndDb = async (id) => {
  const response = await axios.delete(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/deleteImg?imgId=${id}`,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};

// REQUEST MORE INFO
export const requestMoreInfoFromUser = async (userData) => {
  const response = await axios.post(
    `https://auto-detail-server-336dae0010f9.herokuapp.com/api/users/requestInfo`,
    userData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('login succesful');
    return response.data;
  }
};
