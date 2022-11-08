export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
  return '';
};
export const removeLocalStorageItem = (key) => {
  if (key) {
    localStorage.removeItem(key);
  }
};
export const setValueToForm = (data, setValue) => {
  Object.keys(data).map((keys) => {
    setValue(keys, data[keys]);
  });
};
export const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatCurrency = (value) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
