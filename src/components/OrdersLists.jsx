import React, {useEffect} from 'react';
import Order from "./Order";
import {useDispatch, useSelector} from "react-redux";
import {getNewOrders} from "../actions/orderActions";

const OrderList = (props) => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);


    useEffect(() => {
        dispatch(getNewOrders());
    }, []);

    function handleDetailsClick(id) {
        
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2>Lista zamówień</h2>
                {orders.map((order) => (
                    <div key={order.id} className="order-container">
                        <div className="order-details">
                            <p>ID zamówienia: {order.id}</p>
                            <button onClick={() => handleDetailsClick(order.id)}>Szczegóły</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
