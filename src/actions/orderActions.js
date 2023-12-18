import axios from 'axios';
import {
    MOVE_FROM_NEW_TO_PROCESSING, SAVE_NEW_ORDERS, SAVE_ORDERS_IN_PREPARATION,
} from "../types/orderTypes";
import {NEW, PREPARATION} from "../types/statusTypes";

export const getNewOrders = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatus?statusType=' + NEW, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

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

export const getOrdersInPreparation = () => async (dispatch, getState) => {
    try {
        const response = await axios.get('http://192.168.1.2:8080/order/getOrdersByStatus?statusType=' + PREPARATION, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        dispatch({
            type: SAVE_ORDERS_IN_PREPARATION,
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
