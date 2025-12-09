import { toast } from "react-toastify";

export const successAlert = (message, position = "top-right") => {
  toast.success(message, {
    position,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const errorAlert = (message, position = "top-right") => {
  toast.error(message, {
    position,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const infoAlert = (message, position = "top-right") => {
  toast.info(message, {
    position,
    autoClose: 2000,
    theme: "colored",
  });
};

export const warningAlert = (message, position = "top-right") => {
  toast.warning(message, {
    position,
    autoClose: 2000,
    theme: "colored",
  });
};
