import http from "./http";

export const getCheese = async (page, search, payload) => {
  const { data: response } = await http.get(`/cheese`);
  return response;
};

export const getCrust = async (page, search, payload) => {
  const { data: response } = await http.get(`/crust`);
  return response;
};

export const getSpecialBases = async (page, search, payload) => {
  const { data: response } = await http.get(`/specialbases`);
  return response;
};

export const getDips = async (page, search, payload) => {
  const { data: response } = await http.get(`/dips`);
  return response;
};

export const getDrinks = async (page, search, payload) => {
  const { data: response } = await http.get(`/softdrinks`);
  return response;
};

export const getToppings = async (page, search, payload) => {
  const { data: response } = await http.get(`/toppings`);
  return response;
};

export const getAllIngredients = async (page, search, payload) => {
  const { data: response } = await http.get(`/getAllIngredients`);
  return response;
};

export const getSides = async (page, search, payload) => {
  const { data: response } = await http.get(`/sides`);
  return response;
};

export const getStoreLocation = async (page, search, payload) => {
  const { data: response } = await http.get(`/storelocation`);
  return response;
};

export const deliverable = async (payload) => {
  const { data: response } = await http.post(
    "/zipcode/check/deliverable",
    payload
  );
  return response;
};

// Get Special Pizza Requirements
export const getSpecialDetails = async (payload) => {
  const { data: response } = await http.post(`/getSpecialDetails`, payload);
  return response;
};
export const specialIngredients = async (payload) => {
  const { data: response } = await http.get(`/getSpecials`, payload);
  return response;
};

// customer API
export const customerLogin = async (payload, page, search) => {
  const { data: response } = await http.post(`/customer/login`, payload);
  return response;
};
export const customerRegistration = async (payload, page, search) => {
  const { data: response } = await http.post(`/customer/register`, payload);
  return response;
};
export const customerLogout = async (page, search, payload) => {
  const { data: response } = await http.post(`/customer/logout`);
  return response;
};
export const updateProfile = async (payload, page, search) => {
  const { data: response } = await http.post(
    `/customer/updateProfile`,
    payload
  );
  return response;
};
export const customerAddAddress = async (page, search, payload) => {
  const { data: response } = await http.post(`/customer/addAddress`);
  return response;
};
export const customerUpdateAddress = async (page, search, payload) => {
  const { data: response } = await http.post(`customer/updateAddress`);
  return response;
};
export const customerDeleteAddress = async (page, search, payload) => {
  const { data: response } = await http.post(`customer/deleteAddress`);
  return response;
};
export const customerResetPassword = async (payload, page, search) => {
  const { data: response } = await http.post(`customer/resetPassword`, payload);
  return response;
};
export const changePassword = async (payload, page, search) => {
  const { data: response } = await http.post(
    `customer/changepassword`,
    payload
  );
  return response;
};

export const getVerifyToken = async (page, search, authToken) => {
  const { data: response } = await http.get(`verifyToken?token=${authToken}`);
  return response;
};
export const customerUpdatePassword = async (payload, page, search) => {
  const { data: response } = await http.post(
    `customer/updatePassword`,
    payload
  );
  return response;
};
export const getCustomerDetails = async (page, search, authToken) => {
  const { data: response } = await http.get(
    `customer/detailsByToken?token=${authToken}`
  );
  return response;
};

export const orderPlace = async (payload, page, search, authToken) => {
  const { data: response } = await http.post("customer/order/place", payload);
  return response;
};

export const settingApi = async () => {
  const { data: response } = await http.get("settings");
  return response;
};

export const paymentVerified = async (payload) => {
  const { data: response } = await http.post("payment/verify", payload);
  return response;
};

export const paymentCancel = async (payload) => {
  const { data: response } = await http.post("payment/cancel", payload);
  return response;
};

export const getOrderList = async (payload) => {
  const { data: response } = await http.post("customer/order/getlist", payload);
  return response;
};

export const getPostalcodeList = async (payload) => {
  const { data: response } = await http.post("zipcode/list", payload);
  return response;
};

export const getOrderDetails = async (payload) => {
  const { data: response } = await http.post("customer/order/details", payload);
  return response;
};
