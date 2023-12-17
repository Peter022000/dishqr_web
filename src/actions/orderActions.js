import axios from 'axios';
import {
    GET_NEW_ORDERS,
    GET_ORDERS,
    GET_PROCESSING_ORDERS,
    MOVE_FROM_NEW_TO_PROCESSING, SAVE_NEW_ORDERS,
    SAVE_PROCESSING_ORDERS
} from "../types/orderTypes";
import {NEW, PROCESSING} from "../types/statusTypes";

export const getNewOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatus?statusType=' + NEW, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;
        console.log(data)
        dispatch({
            type: SAVE_NEW_ORDERS,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};

export const getProcessingOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatus?statusType=' + PROCESSING, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_PROCESSING_ORDERS,
            payload: {
                data: data
            },

        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};


export const changeOrderStatus = (order, status) => async (dispatch, getState) => {
    try {
        let body = JSON.stringify({
            acceptedOrderDto: order,
            newStatus: status
            });

        const response = await axios.post('http://192.168.1.2:8080/order/changeOrderStatus', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: MOVE_FROM_NEW_TO_PROCESSING,
            payload: {
                data: data
            },
        });
    } catch (error) {
        console.error('Error while getting orders:', error);
    }
};
