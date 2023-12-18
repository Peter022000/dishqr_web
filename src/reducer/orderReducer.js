import {
    SAVE_NEW_ORDERS,
    SAVE_NEW_ORDER,
    CHANGE_STATUS, SAVE_ORDERS_IN_PREPARATION,
} from "../types/orderTypes";

const initialState = {
    newOrders: [],
    ordersInPreparations: [],
    served: [],
    finished: [],
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
        case CHANGE_STATUS:
            const changedOrder = action.payload.data;

            // Bezpośrednio usuwaj z odpowiedniej tablicy i dodawaj changedOrder
            switch (changedOrder.status) {
                case 'PREPARATION':
                    return {
                        ...state,
                        newOrders: state.newOrders.filter(order => order.id !== changedOrder.id),
                        ordersInPreparations: [changedOrder, ...state.ordersInPreparations],
                    };
                case 'SERVED':
                    return {
                        ...state,
                        ordersInPreparations: state.ordersInPreparations.filter(order => order.id !== changedOrder.id),
                        served: [changedOrder, ...state.served],
                    };
                case 'FINISHED':
                    return {
                        ...state,
                        served: state.served.filter(order => order.id !== changedOrder.id),
                        finished: [changedOrder, ...state.finished],
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default orderReducer;
