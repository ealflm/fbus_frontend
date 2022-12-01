import dayjs from "dayjs";

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
  return "";
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
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const getTimeForApi = (value) => {
  return new Date(value.$d).getHours() + ":" + new Date(value.$d).getMinutes();
};

export const mapTimeWithUI = (time) => {
  const now = dayjs();
  return now.set("hour", time.split(":")[0]).set("minute", time.split(":")[1]);
};
