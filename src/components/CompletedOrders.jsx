import React, {useEffect} from "react";
import OrderList from "./OrdersLists";
import {changeOrderStatus, getCompletedOrders, getNewOrders, getServedOrders} from "../actions/orderActions";
import {COMPLETED, PREPARATION} from "../types/statusTypes";
import {useDispatch, useSelector} from "react-redux";

const CompletedOrders = (props) => {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.order.completedOrders);

    useEffect(() => {
        if(orders.length===0) {
            dispatch(getCompletedOrders());
        }
    }, [dispatch]);

    return (
        <div className="page-container">
            <h2 style={{ textAlign: 'center', margin: "10px" }}>Wydane zamówienia</h2>
            <OrderList key="completedOrders"
                       orders={orders}
                       buttonFunction={null}
                       functionName={null}
            />
        </div>
    );
}

export default CompletedOrders;
