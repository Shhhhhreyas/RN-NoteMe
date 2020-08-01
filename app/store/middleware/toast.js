const toast = (store) => (next) => (action) => {
  if (action.type === "error")
    console.log(`Toastify: ${action.payload.message}`);
  else {
    console.log(action.type);
    next(action);
  }
};

export default toast;
