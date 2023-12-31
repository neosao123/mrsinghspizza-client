import http from "./http";

export const getCheese = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/cheese`
    );
    return response;
};

export const getCrust = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/crust`
    );
    return response;
};

export const getSpecialBases = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/specialbases`
    );
    return response;
};

export const getDips = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/dips`
    );
    return response;
};

export const getDrinks = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/softdrinks`
    );
    return response;
};

export const getToppings = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/toppings`
    );
    return response;
};

export const getAllIngredients = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/getAllIngredients`
    );
    return response;
};

export const getSides = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/sides`
    );
    return response;
};

export const getStoreLocation = async (page, search, payload) => {
    const { data: response } = await http.get(
        `/storelocation`
    );
    return response;
};


// customer API
export const customerLogin = async (page, search, payload) => {
    const { data: response } = await http.post(
        `/customer/login`,payload
    );
    return response;
};
export const customerRegistration = async (page, search, payload) => {
    const { data: response } = await http.post(
        `/customer/register`
    );
    return response;
};
export const customerLogout = async (page, search, payload) => {
    const { data: response } = await http.post(
        `/customer/logout`
    );
    return response;
};
export const updateProfile = async (page, search, payload) => {
    const { data: response } = await http.post(
        `/customer/updateProfile`
    );
    return response;
};
export const customerAddAddress = async (page, search, payload) => {
    const { data: response } = await http.post(
        `/customer/addAddress`
    );
    return response;
};
export const customerUpdateAddress = async (page, search, payload) => {
    const { data: response } = await http.post(
        `customer/updateAddress`
    );
    return response;
};
export const customerDeleteAddress = async (page, search, payload) => {
    const { data: response } = await http.post(
        `customer/deleteAddress`
    );
    return response;
};
export const customerResetPassword = async (page, search, payload) => {
    const { data: response } = await http.post(
        `customer/resetPassword`
    );
    return response;
};
export const getVerifyToken = async (page, search, authToken) => {
    const { data: response } = await http.get(
        `verifyToken?token=${authToken}`
    );
    return response;
};
export const customerUpdatePassword = async (page, search, payload) => {
    const { data: response } = await http.post(
        `customer/updatePassword`
    );
    return response;
};
export const getCustomerDetails = async (page, search, authToken) => {
    const { data: response } = await http.get(
        `customer/detailsByToken?token=${authToken}`
    );
    return response;
};
