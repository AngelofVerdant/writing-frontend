export const GetError = (error) => {
    return error.response && error.response.data.error
      ? error.response.data.error
      : error.message;
};
    