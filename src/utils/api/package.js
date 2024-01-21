import api from "../axios";

// save package
export const savePackage = async (data) => {
  try {
    const response = await api.post("/packages", data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response?.data ?? error;
  }
};

// get all packages
export const getAllPackages = async () => {
  try {
    const response = await api.get(`/packages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get filtered packages
export const getPackages = async (
  categories,
  division,
  duration,
  page,
  limit
) => {
  try {
    const response = await api.get(
      `/packages?categories=${categories}&division=${division}&duration=${duration}&page=${page}&limit=${limit}`
    );
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// get single package
export const getSinglePackage = async (id) => {
  try {
    const response = await api.get(`/packages/:${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

// update package
export const updatePackage = async (id) => {
  try {
    const response = await api.put(`/packages/:${id}`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// delete package
export const deletePackage = async (id) => {
  try {
    const response = await api.delete(`/packages/:${id}`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// filter packages
export const filterPackages = async (
  categories,
  division,
  duration,
  page,
  limit
) => {
  try {
    const response = await api.get("/packages", {
      params: {
        // categories: categories.join(","), // categories is an array
        categories, // categories is an array
        division,
        duration,
        page,
        limit,
      },
    });
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
