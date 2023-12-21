import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import NewOrders from "../components/NewOrders";
import OrdersInPreparation from "../components/OrdersInPreparation";
import ServedOrders from "../components/ServedOrders";
import CompletedOrders from "../components/CompletedOrders";
import Login from "../components/Login";
import Error from "../components/Error";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import AdminPanel from "../components/AdminPanel";

const NavigationRoutes = () => {

    const isLogged = useSelector((state) => state.auth.isLogged);

    useEffect(() => {
        console.log(isLogged)
    }, [isLogged]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><NavigationBar/><Outlet/><Footer/></>}>
                    <Route index element={<NewOrders />} />
                    <Route path="new-orders" element={<NewOrders/>} />
                    <Route path="orders-in-preparation" element={<OrdersInPreparation/>} />
                    <Route path="served-orders" element={<ServedOrders/>} />
                    <Route path="completed-orders" element={<CompletedOrders/>} />
                    <Route path="admin-panel" element={<AdminPanel/>} />
                    <Route path="admin-panel/login" element={isLogged ? <Navigate replace to="/admin-panel"/> : <Login/>} />
                    <Route path="admin-panel/edit-menu" element={isLogged ? <Login/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/edit-discount" element={isLogged ? <Login/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="admin-panel/statistics" element={isLogged ? <Login/> : <Navigate replace to="/admin-panel"/>} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default NavigationRoutes;
