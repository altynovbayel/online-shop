import axios from "axios";

const config = (accessToken) => {
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
}

export const api = {
  getProducts: () => axios.get('/products/product'),
  getSingleCategories: (id) => axios.get(`/categories/category/${id}/`),
  getSingleProduct: (id) => axios.get(`/products/product/${id}`),
  registerUser: (data) => axios.post('/users/user/', data),
  getToken: (data) => axios.post(`/token/`, data),
  postBasket: (accessToken, data) => axios.post('/baskets/', data, config(accessToken)),
  getBasket: (accessToken) => axios.get('/baskets/', config(accessToken)),
  changeCount: (accessToken, id, count) => axios.post(`/basket_detail/${id}`, count, config),
  deleteBasketCard: (id, accessToken) => axios.delete(`/baskets/${id}/`, config(accessToken)),
  postFavorites: (accessToken, data) => axios.post(`/favorites/`, data, config(accessToken)),
  getFavorites: (accessToken) => axios.get('/favorites/', config(accessToken)),
  deleteSingleFavorite: (accessToken, id) => axios.delete(`/favorites/${id}/`, config(accessToken)),
  getUser: (accessToken) => axios.get('/users/get_user/', config(accessToken)),
}