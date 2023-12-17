import {
    GET_NEW_ORDERS,
    GET_ORDERS,
    GET_PROCESSING_ORDERS,
    MOVE_FROM_NEW_TO_PROCESSING,
    SAVE_NEW_ORDERS, SAVE_PROCESSING_ORDERS
} from "../types/orderTypes";

const initialState = {
    newOrders: [],
    processingOrders: [],
    finishedOrders: [],
    allOrders: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_NEW_ORDERS:
            return {
                ...state,
                newOrders: action.payload.data,
            };
        case SAVE_PROCESSING_ORDERS:
            return {
                ...state,
                processingOrders: action.payload.data,
            };
        case MOVE_FROM_NEW_TO_PROCESSING:
            const orderId = action.payload.data.id;

            const updatedNewOrders = state.newOrders.filter(order => {
                return order.id !== orderId;
            });

            console.log(state.processingOrders ? [action.payload.data, ...state.processingOrders] : [action.payload.data])
            return {
                ...state,
                processingOrders: state.processingOrders ? [action.payload.data, ...state.processingOrders] : [action.payload.data],
                newOrders: updatedNewOrders,
            };
        default:
            return state;
    }
};

export default orderReducer;
