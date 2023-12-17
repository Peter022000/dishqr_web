import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewOrders } from '../actions/orderActions';
import axios from 'axios';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {Card} from "react-bootstrap";

const OrderList = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.newOrders);
    const [tableNumbers, setTableNumbers] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        const formattedDate = new Date(dateString).toLocaleString(undefined, options);
        return formattedDate.replace(/\//g, '.');
    };

    const getTableNumber = async (tableNumberId) => {
        try {
            const response = await axios.get(
                'http://192.168.1.2:8080/qrCode/getValue/' + tableNumberId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setTableNumbers((prevTableNumbers) => ({
                ...prevTableNumbers,
                [tableNumberId]: response.data.qrCode,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        orders.forEach((order) => {
            let a = getTableNumber(order.tableNoId);
        });
    }, [orders]);

    useEffect(() => {
        dispatch(getNewOrders());
    }, [dispatch]);

    const toggleOpen = () => {
        setShowDetailsModal(!showDetailsModal);
    };

    const toggleClose = () => {
        if(setShowDetailsModal()) {
            setShowDetailsModal(!showDetailsModal);
        }
    };

    const handleDetailsClick = (order) => {
        setSelectedOrder(order);
        toggleOpen();
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2 style={{ textAlign: 'center', margin: "10px" }}>Nowe zamówienia</h2>
                {orders.map((order, index) => {
                    return (
                        <div key={index + '_' + order.id} className="order-container">
                            <div className="order-details">
                                <div className="order-details-item">
                                    Zamówienie: <br />
                                    {order.orderDishesDto.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {item.dishDto.name}
                                            <br />
                                        </React.Fragment>
                                    ))}</div>
                                <div className="order-details-item">Data: {formatDate(order.date)}</div>
                                <div className="order-details-item">Numer stolika: {tableNumbers[order.tableNoId]}</div>
                                <div className="order-details-item">Opłacono: {order.isPayed ? "Tak" : "Nie"}</div>
                                <div className="order-details-item">Status: {order.status}</div>
                            </div>
                            <MDBBtn
                                className="button"
                                onClick={() => handleDetailsClick(order)}
                            >
                                Szczegóły
                            </MDBBtn>
                        </div>
                    );
                })}
            </div>

            <MDBModal className="modal-lg"  open={showDetailsModal} onClose={toggleClose} tabIndex="-1">
                <MDBModalDialog scrollable>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Zamówienie</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {selectedOrder ? (
                                <>
                                    <h2 style={{textAlign: "center"}}>Szczegóły</h2>
                                    <div className="order-container-without-border">
                                        <div className="order-details">
                                        <div className="order-details-item">Data: {formatDate(selectedOrder.date)}</div>
                                        <div className="order-details-item">Metoda płatności: {selectedOrder.paymentMethod}</div>
                                        <div className="order-details-item">Numer stolika: {tableNumbers[selectedOrder.tableNoId]}</div>
                                        <div className="order-details-item">Status: {selectedOrder.status}</div>
                                        <div className="order-details-item">Opłacono: {selectedOrder.isPayed ? "Tak" : "Nie"}</div>
                                        </div>
                                    </div>
                                    <h3 style={{textAlign: "center"}}>Dania:</h3>
                                    <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center", padding: "1rem"}}>
                                        {selectedOrder.orderDishesDto.map((dish, index) => (
                                            <div key={index + "_" + dish.dishDto.id} style={{margin: '1em'}}>
                                                <Card style={{ width: '18rem', zIndex:1}}>
                                                <Card.Body>
                                                    <Card.Title style={{fontSize: "1.6rem",textAlign: "center"}}>{dish.dishDto.name}</Card.Title>
                                                    <Card.Body>
                                                        <p>Składniki: {dish.dishDto.ingredients.join(', ')}</p>
                                                        <p>Cena: {dish.dishDto.price}</p>
                                                        <p>Ilość: {dish.quantity}</p>
                                                        <p>Całkowity koszt: {dish.cost}</p>
                                                    </Card.Body>
                                                </Card.Body>
                                            </Card>
                                            </div>

                                            ))}
                                    </div>
                                </>
                            ) : null}
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleOpen}>
                                Zamknij
                            </MDBBtn>
                            <MDBBtn className="button">Przyjmij</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default OrderList;
