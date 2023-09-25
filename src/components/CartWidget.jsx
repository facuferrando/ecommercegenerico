import carro from '../assets/carrito.png';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import { Cart } from './Cart';

export const CartWidget = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const {totalWidget}= useContext(CartContext)

    return(
        <>
        <Container onClick={handleShow} >
            
            <img  src={carro} alt='carrito' /> <span>{totalWidget}</span>;
            
   
        </Container>

        <Offcanvas placement={"end"} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title> Carrito 🛒 </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Cart handleClose={handleClose}/>
        </Offcanvas.Body>
        </Offcanvas>
        </>
    )
};