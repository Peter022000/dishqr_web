import './App.css';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Error from "./components/Error";
import Footer from "./components/Footer";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store/store";
import NewOrders from "./components/NewOrders";
import OrdersInPreparation from "./components/OrdersInPreparation";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServedOrders from "./components/ServedOrders";
import CompletedOrders from "./components/CompletedOrders";

function App() {


  return (
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<><NavigationBar/><Outlet/><Footer/></>}>
                      <Route index element={<NewOrders />} />
                      <Route path="newOrders" element={<NewOrders/>} />
                      <Route path="ordersInPreparation" element={<OrdersInPreparation/>} />
                      <Route path="servedOrders" element={<ServedOrders/>} />
                      <Route path="completedOrders" element={<CompletedOrders/>} />
                      <Route path="*" element={<Error />} />
                  </Route>
              </Routes>
          </BrowserRouter>
          <ToastContainer
              autoClose={false}
              position="top-center"/>
      </Provider>
  );
}

export default App;
