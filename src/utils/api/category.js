import api from "../axios";

// save category
export const saveCategory = async (data) => {
  try {
    const res = await api.post("/categories", data);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

// get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

// get single category
export const getSingleCategory = async (id) => {
  try {
    const res = await api.get(`/categories/:${id}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

// update category
export const updateCategory = async (id) => {
  try {
    const res = await api.put(`/categories/:${id}`);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

// delete category
export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/:${id}`);
    return res;
  } catch (error) {
    console.error(error.message);
  }
};
