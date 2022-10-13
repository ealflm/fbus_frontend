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
