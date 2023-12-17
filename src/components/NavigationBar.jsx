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
import {useState} from "react";

const NavigationBar = () => {
    const [openNavText, setOpenNavText] = useState(false);

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
                        {/* Dodaj ścieżki do nawigacji */}
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/newOrders'>
                                Nowe zamówienia
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link className="nav-link text-decoration-none text-black" to='/processingOrders'>
                                Zamówienia w toku
                            </Link>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default NavigationBar;
