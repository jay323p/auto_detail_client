import axios from 'axios';

// QUICK REVIEW IMAGE UPLOAD
export const quickReviewImageUpload = async (imgData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/reviews/quickImageUpload',
    imgData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};

// QUICK REVIEW IMAGE DELETE
export const quickReviewImageDelete = async (imgData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/reviews/quickDeleteImage',
    imgData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};

// SUBMIT REVIEW
export const submitUserReview = async (reviewData) => {
  const response = await axios.post(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/reviews/submitReview',
    reviewData,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};

// GET ALL REVIEWS
export const getAllUserReviews = async () => {
  const response = await axios.get(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/reviews/getReviews',
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};

// DELETE REVIEW ADMIN
export const deleteUserReview = async (id) => {
  const response = await axios.patch(
    'https://auto-detail-server-336dae0010f9.herokuapp.com/api/reviews/deleteReviewAdmin',
    id,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};
