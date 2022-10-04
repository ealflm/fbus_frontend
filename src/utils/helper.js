export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  if (item) return item;
  return '';
};
