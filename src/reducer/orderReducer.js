import {
    SAVE_NEW_ORDERS,
    SAVE_NEW_ORDER,
    CHANGE_STATUS, SAVE_ORDERS_IN_PREPARATION, SAVE_ORDERS_IN_SERVED, SAVE_ORDERS_IN_COMPLETED,
} from "../types/orderActionTypes";
import {toast} from "react-toastify";
import {statusTranslations} from "../types/statusTranslations";
import {COMPLETED, PREPARATION, SERVED} from "../types/statusTypes";

const initialState = {
    newOrders: [],
    ordersInPreparations: [],
    servedOrders: [],
    completedOrders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_NEW_ORDERS:
            console.log("SAVE_NEW_ORDERS", action.payload.data);
            return {
                ...state,
                newOrders: action.payload.data || [], // Ensure it's an array
            };
        case SAVE_NEW_ORDER:
            console.log("SAVE_NEW_ORDER", action.payload.data);
            toast.info("Nowe zamówienie");
            return {
                ...state,
                newOrders: [action.payload.data, ...state.newOrders],
            };
        case SAVE_ORDERS_IN_PREPARATION:
            console.log("SAVE_ORDERS_IN_PREPARATION", action.payload.data);
            return {
                ...state,
                ordersInPreparations: action.payload.data || [],
            };
        case SAVE_ORDERS_IN_SERVED:
            console.log("SAVE_ORDERS_IN_SERVED", action.payload.data);
            return {
                ...state,
                servedOrders: action.payload.data || [],
            };
        case SAVE_ORDERS_IN_COMPLETED:
            console.log("SAVE_ORDERS_IN_COMPLETED", action.payload.data);
            return {
                ...state,
                completedOrders: action.payload.data || [],
            };
        case CHANGE_STATUS:
            const changedOrder = action.payload.data;
            toast.info("Zmieniono status na \n" + statusTranslations[action.payload.data.status] , {position: "top-right"});

            switch (changedOrder.status) {
                case PREPARATION:
                    return {
                        ...state,
                        newOrders: state.newOrders.filter(order => order.id !== changedOrder.id),
                        ordersInPreparations: [changedOrder, ...state.ordersInPreparations],
                    };
                case SERVED:
                    return {
                        ...state,
                        ordersInPreparations: state.ordersInPreparations.filter(order => order.id !== changedOrder.id),
                        servedOrders: [changedOrder, ...state.servedOrders],
                    };
                case COMPLETED:
                    return {
                        ...state,
                        servedOrders: state.servedOrders.filter(order => order.id !== changedOrder.id),
                        completedOrders: [changedOrder, ...state.completedOrders],
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default orderReducer;
