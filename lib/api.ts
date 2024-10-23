import api from "./woocommerce";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await api.get("products");
    return response.data; // Return the products data
  } catch (error) {
    console.error(error.response.data); // Log any errors
    throw error; // Rethrow the error for handling in components
  }
};

// Fetch product by ID
export const fetchProductById = async (slug: string) => {
  try {
    const response = await api.get(`products/${slug}`);
    return response.data; // Return the specific product data
  } catch (error) {
    console.error(error.response.data); // Log any errors
    throw error; // Rethrow the error for handling in components
  }
};

// export const fetchProductBySlug = async (slug: string) => {
//   try {
//     const response = await api.get(`products?slug=${slug}`);
//     return response.data[0]; // Return the first product that matches the slug
//   } catch (error) {
//     console.error(error.response.data); // Log any errors
//     throw error; // Rethrow the error for handling in components
//   }
// };
