import orderReducer from "../reducer/orderReducer";
import { configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'

const store = configureStore({
    reducer: {
        order: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createStateSyncMiddleware({})),});

initMessageListener(store);
export { store };
