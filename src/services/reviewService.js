import axios from 'axios';

// QUICK REVIEW IMAGE UPLOAD
export const quickReviewImageUpload = async (imgData) => {
  const response = await axios.post(
    'http://localhost:5000/api/reviews/quickImageUpload',
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
    'http://localhost:5000/api/reviews/quickDeleteImage',
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
    'http://localhost:5000/api/reviews/submitReview',
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
    'http://localhost:5000/api/reviews/getReviews',
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
    'http://localhost:5000/api/reviews/deleteReviewAdmin',
    id,
    { withCredentials: true }
  );

  if (response.statusText === 'OK') {
    console.log('registeration succesful');
    return response.data;
  }
};
