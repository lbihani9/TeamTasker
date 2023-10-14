import { toast } from 'react-toastify';

export const uppercaseFirst = (str) => {
  return `${str[0].toUpperCase()}${str.substr(1)}`;
};

export const notify = (message = 'Loading', type = 'default', ) => {
  if (type === 'default') {
    toast(message);
  } else {
    toast[type](message);
  }
};

export const dismissNotifications = (toastId = null) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};
