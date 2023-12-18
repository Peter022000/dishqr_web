import React, {useEffect} from 'react';
import '../App.css';
import OrderList from "./OrdersLists";
import {useDispatch, useSelector} from "react-redux";
import {getNewOrders} from "../actions/orderActions";

const Home = (props) => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        let a = dispatch(getNewOrders);
    }, []);

    return (
        <div className="page-container">
            <div className="content-wrap">
                <OrderList/>
            </div>
        </div>
    );
};

export default Home;
