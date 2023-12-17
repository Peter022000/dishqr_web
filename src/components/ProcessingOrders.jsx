import React from "react";
import OrderList2 from "./OrdersLists2";

const NewOrders = (props) => {

    return (
        <div className="page-container">
            <div className="content-wrap">
                <OrderList2 key="processingOrders" />
            </div>
        </div>
    );
}

export default NewOrders;
