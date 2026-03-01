import {
  checkoutApi,
  getOrdersApi
} from "../../../api/order";


export const checkoutOrder = async () => {

  const res = await checkoutApi();

  return res.data;

};


export const getOrders = async () => {

  const res = await getOrdersApi();

  return res.data;

};