"use server";

import api from "../axios";

// save package
export const savePackage = async (data) => {
  try {
    const res = await api.post("/packages", data);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

// get all packages
export const getPackage = async () => {
  try {
    const res = await api.get("/packages");
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

// get single package
export const getSinglePackage = async (id) => {
  try {
    const res = await api.get(`/packages/:${id}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

// update package
export const updatePackage = async (id) => {
  try {
    const res = await api.put(`/packages/:${id}`);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

// delete package
export const deletePackage = async (id) => {
  try {
    const res = await api.delete(`/packages/:${id}`);
    return res;
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
    const res = await api.get("/packages", {
      params: {
        categories: categories.join(","), // categories is an array
        division,
        duration,
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};
