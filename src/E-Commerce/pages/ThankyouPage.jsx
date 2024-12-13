import React from 'react'
import Button from 'react-bootstrap/Button';
import './ThankyouPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {removeAllItems} from '../store/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThankyouPage = ({order}) => {
    const dispatch=useDispatch();

    console.log(order,"from thank")
    console.log(order?.products.image,"jk")
    let navigate=useNavigate();

    useEffect(() => {
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio, opts) {
            window.confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, []);

    const handleConfirmation=()=>{
        dispatch(removeAllItems())
        navigate("/")
    }
    return (

        <div style={{marginLeft:"100px ",width:"900px",padding:"40px"}}>

            <div>
                <p>Thank you for the order!😊</p>
                <p>Your order has been placed successfully. You will receive an email confirmation shortly.</p>
            </div>
            <div style={{width:"900px",backgroundColor:"#E5E4E2",border:"1px solid",padding:"20px",borderRadius:"10px"}}>
                <h3>Order Summary</h3>
                <p>Order Number:{order?.orderNumber}</p>
                <div>
                    <h3>Shipping Information</h3>
                    <p>{order?.shippingInformation.address}</p>   
                    <p>{order?.shippingInformation.city}</p>
                    <p>{order?.shippingInformation.zip}</p>
                </div>

                <div>
                    <h3>Products Ordered</h3>
                    {order?.products.map(product=>(
                        <div className='d-flex' style={{justifyContent:"space-between",alignItems:"center"}}>
                            <img src={product.image} width="80px"/>
                            <p>{product.name} X {product.quantity}</p>
                            <p>
                            <FontAwesomeIcon icon="fa-solid fa-dollar-sign" style={{color: "#00040a",paddingTop:"13px",paddingRight:"5px"}}/>
                                {product.price * product.quantity}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <span>Total Price: 
                    </span>
                    <span style={{fontWeight:"700"}}>
                    <FontAwesomeIcon icon="fa-solid fa-dollar-sign" style={{color: "#00040a",paddingTop:"13px",paddingRight:"5px"}}/>
                    {order?.totalPrice.toFixed(2)}</span>
                </div>
                    <br />
                <div className='d-flex' style={{gap:"20px"}}>
                <Button variant="success">Order Tracking</Button>
                <Button variant="danger" onClick={handleConfirmation}>Continue Shopping</Button>
                </div>
            </div>
         </div>
        
    )
}

export default ThankyouPage;