import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkOutThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   {cart.map(product => (
                    <div>{product.title}</div>
                   ))}
                   <Button onClick={() => dispatch(checkOutThunk())}>Checkout</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Cart;