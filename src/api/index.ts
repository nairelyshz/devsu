import {URL_API} from './apiURL';
import {FinancialProducts} from './financialProducts.service';

export const services = {
  financialService: new FinancialProducts(URL_API),
};
