// frontend/api/products.ts
import { apiClient } from './apiClient';

export const getAllProducts = () => {
  return apiClient('products', 'GET');
};

export const createProduct = (data: any) => {
  return apiClient('products', 'POST', data);
};

// Este no lo defines si no lo necesitas:
// export const deleteProduct = ...
