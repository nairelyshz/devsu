export class FinancialProducts {
  axios;
  config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authorId: '1234567',
    },
  };

  constructor(axios: any) {
    this.axios = axios;
  }

  productsList() {
    return this.axios.get(`/bp/products`, this.config);
  }

  createProduct(data: any) {
    return this.axios.post(`/bp/products`, data, this.config);
  }

  validateId(id: string) {
    return this.axios.get(`/bp/products/verification?id=${id}`, this.config);
  }

  updateProduct(data: any) {
    return this.axios.put(`/bp/products`, data, this.config);
  }

  deleteProduct(id: string) {
    return this.axios.delete(`/bp/products?id=${id}`, this.config);
  }
}
