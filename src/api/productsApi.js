import axios from "axios";

const api_url = 'https://5fc9346b2af77700165ae514.mockapi.io/';

export const getProducts = () => {
  return axios.get(`${api_url}products`).then(({ data }) => data)
};

export const getProductsDetail=(id)=>{
  return axios.get(`${api_url}products/${id}`).then(({ data }) => data)
}

export const getProductsBrand = () => {
  return axios.get(`${api_url}products`)
    .then(({ data }) => {
      const brands = [...new Set(data.map(product => product.brand))];
      return brands;
    });
};

export const getProductsModel = () => {
  return axios.get(`${api_url}products`)
    .then(({ data }) => {
      const models = [...new Set(data.map(product => product.model))];
      return models;
    });
};

