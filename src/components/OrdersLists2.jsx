import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeOrderStatus, getNewOrders, getProcessingOrders} from '../actions/orderActions';
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
import {statusTranslations} from "../types/statusTranslations";
import {paymentMethodTranslations} from "../types/paymentMethodTranslations";
import {FINISHED, PROCESSING} from "../types/statusTypes";

const OrderList2 = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.processingOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        const formattedDate = new Date(dateString).toLocaleString(undefined, options);
        return formattedDate.replace(/\//g, '.');
    };

    useEffect(() => {
        dispatch(getProcessingOrders());
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

    function finishOrder(acceptedOrder) {
        dispatch(changeOrderStatus(acceptedOrder, FINISHED))
    }

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2 style={{ textAlign: 'center', margin: "10px" }}>Nowe zamówienia</h2>
                {orders?.map((order, index) => {
                    return (
                        <div key={index + '_' + order.id} className="order-container">
                            <div className="order-details">
                                <div className="order-details-item">
                                    <strong>Dania:</strong><br />
                                    {order?.orderDishesDto?.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {item.dishDto.name}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="order-details-item">
                                    <strong>Numer stolika:</strong> {order.tableNo}<br />
                                    <strong>Koszt:</strong> {order.cost} zł<br />
                                    <strong>Metoda płatności:</strong> {paymentMethodTranslations[order.paymentMethod]}
                                </div>
                                <div className="order-details-item">
                                    <strong>Data:</strong> {formatDate(order.date)}<br />
                                    <strong>Status:</strong> {statusTranslations[order.status]}<br />
                                    {order.orderDiscount.isUsed &&
                                        <React.Fragment>
                                            <strong>Wykorzystano obniżkę:</strong> {order.orderDiscount.discountPercentage * 100}%<br />
                                        </React.Fragment>
                                    }
                                    <strong>Opłacono:</strong> {order.isPayed ? "Tak" : "Nie"}
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <MDBBtn
                                    style={{ marginRight: "1.2rem" }}
                                    className="button"
                                    onClick={() => handleDetailsClick(order)}
                                >
                                    Szczegóły
                                </MDBBtn>
                                <MDBBtn
                                    className="button"
                                    onClick={() => finishOrder(order)}
                                >
                                    Przyjmij
                                </MDBBtn>
                            </div>
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
                        {selectedOrder ? (
                            <>
                                <MDBModalBody>
                                    <h2 style={{textAlign: "center"}}>Szczegóły</h2>
                                    <div className="order-container-without-border">
                                        <div className={selectedOrder?.orderDiscount?.isUsed ? "order-details" : "order-details-two-columns"}>
                                            <div className="order-details-item">
                                                <strong>Numer stolika:</strong> {selectedOrder.tableNo} <br/>
                                                <strong>Koszt:</strong> {selectedOrder.cost} zł<br/>
                                                <strong>Metoda płatności:</strong> {paymentMethodTranslations[selectedOrder.paymentMethod]}
                                            </div>
                                            <div className="order-details-item">
                                                <strong>Data:</strong> {formatDate(selectedOrder.date)} <br/>
                                                <strong>Status:</strong> {statusTranslations[selectedOrder.status]} <br/>
                                                <strong>Opłacono:</strong> {selectedOrder.isPayed ? "Tak" : "Nie"}
                                            </div>
                                            {selectedOrder?.orderDiscount?.isUsed &&
                                                <div className="order-details-item">
                                                    <strong>Wykorzystano obniżkę:</strong> {selectedOrder.orderDiscount.discountPercentage * 100}%<br />
                                                    <strong>Poprzedni koszt:</strong> {selectedOrder.orderDiscount.oldCost} zł
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <h3 style={{textAlign: "center"}}>Dania:</h3>
                                    <div style={{display: "flex", flexWrap:"wrap", justifyContent: "center", padding: "1rem"}}>
                                        {selectedOrder?.orderDishesDto?.map((dish, index) => (
                                            <div key={index + "_" + dish.dishDto.id} style={{margin: '1em'}}>
                                                <Card style={{ width: '18rem', zIndex:1}}>
                                                    <Card.Body>
                                                        <Card.Title style={{fontSize: "1.6rem",textAlign: "center"}}>{dish.dishDto.name}</Card.Title>
                                                        <Card.Body>
                                                            <p>Składniki: {dish.dishDto.ingredients.join(', ')}</p>
                                                            <p>Cena: {dish.dishDto.price} zł</p>
                                                            <p>Ilość: {dish.quantity}</p>
                                                            <p>Całkowity koszt: {dish.cost} zł</p>
                                                        </Card.Body>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={toggleOpen}>
                                        Zamknij
                                    </MDBBtn>
                                    <MDBBtn className="button" onClick={() => finishOrder(selectedOrder)}>Przyjmij</MDBBtn>
                                </MDBModalFooter>
                            </>
                        ) : null}
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default OrderList2;
