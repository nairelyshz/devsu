import axios from 'axios';

export const URL_API = axios.create({
  baseURL:
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros',
});
