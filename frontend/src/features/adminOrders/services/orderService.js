import {
	getAdminOrdersApi,
	getAdminPendingOrdersApi,
	updateAdminOrderStatusApi,
} from "../../../api/adminOrder";

export const fetchOrders = async (params) => {
	const res = await getAdminOrdersApi(params);
	return res.data;
};

export const fetchPendingOrders = async () => {
	const res = await getAdminPendingOrdersApi();
	return res.data;
};

export const changeOrderStatus = async (orderId, status) => {
	const res = await updateAdminOrderStatusApi(orderId, status);
	return res.data;
};
