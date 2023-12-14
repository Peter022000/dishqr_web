import {GET_ORDERS} from "../types/orderTypes";

const initialState = {
    orders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            console.log(action.payload.data)
            return {
                orders: action.payload.data,
            };
        default:
            return state;
    }
};

export default orderReducer;
