import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import {
    MDBCollapse,
    MDBContainer, MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarNav,
    MDBNavbarToggler
} from "mdb-react-ui-kit";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {CHANGE_STATUS, SAVE_NEW_ORDER} from "../types/orderTypes";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

const NavigationBar = () => {
    const [openNavText, setOpenNavText] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new SockJS('http://192.168.1.2:8080/ws', null, { withCredentials: true, transports: 'websocket' });
        const stompClient = Stomp.over(socket);

        stompClient?.connect({}, () => {
            // Subscribe to the topic for new orders
            stompClient?.subscribe('/topic/newOrder', (message) => {
                // Handle incoming new order
                const newOrder = JSON.parse(message.body);
                dispatch({
                    type: SAVE_NEW_ORDER,
                    payload: {
                        data: newOrder
                    },
                });
            });

            // Subscribe to the topic for changed order status
            stompClient?.subscribe('/topic/changedStatusOrder', (message) => {
                // Handle incoming order status update
                const updatedOrder = JSON.parse(message.body);

                dispatch({
                    type: CHANGE_STATUS,
                    payload: {
                        data: updatedOrder
                    },
                });
            });
        });
    }, []); // Empty dependency array ensures this effect runs only once
    return (
        <MDBNavbar expand='lg' light bgColor='light' style={{height:'4rem'}}>
            <MDBContainer fluid>
                <MDBNavbarBrand>
                    DishQr
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarText'
                    aria-controls='navbarText'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNavText(!openNavText)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse style={{backgroundColor: "#f8f9fa", color: 'f8f9fa', zIndex:1000, padding: "1.2rem"}} navbar open={openNavText}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/newOrders'>
                                Nowe zamówienia
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/ordersInPreparation'>
                                Zamówienia w przygotowaniu
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/ordersServed'>
                                Wydane zamówienia
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/ordersServed'>
                                Zakończone zamówienia
                            </Link>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavigationBar;
