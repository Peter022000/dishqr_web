import React from "react";
import OrderList from "./OrdersLists";

const NewOrders = (props) => {

    return (
        <div className="page-container">
            <div className="content-wrap">
                <OrderList key="newOrders"/>
            </div>
        </div>
    );
}

export default NewOrders;
