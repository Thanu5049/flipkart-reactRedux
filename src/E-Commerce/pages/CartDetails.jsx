import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const CartDetails = ({ setOrder }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
       // const fullAddress = `${data.name}, ${data.mobile}, ${data.city}, ${data.state}, ${data.zip}`;
       // setAddress((prevAddress) => [...prevAddress, fullAddress]);
        console.log(data,"address from cart details");
        const newOrder={
            products:cart.products,
            orderNumber:"12344",
            shippingInformation:shippingInfo,
            totalPrice:cart.totalPrice
        }
        setOrder(newOrder)
        setTimeout(() => {
            navigate("/order-confirmation");
        }, 0);
        navigate("/order-confirmation")
        reset();
    };
let navigate=useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        address:'',
        city:'',
        zip:''
    });
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const cart = useSelector(state => state.cart);
   // console.log(cart, "from cart details")

  
    return (
        <div>

            <div style={{ marginLeft: "5%", marginBottom: "5%" }}>

                <Form noValidate onSubmit={handleSubmit(onSubmit)} style={{ margin: "15px" }}>


                    <div className='cart-checkout d-flex' style={{ justifyContent: 'space-evenly' }}>
                        <div style={{ padding: "20px", width: "700px" }}  >
                            <h3>CHECKOUT</h3>
                            <div style={{ marginTop: "40px" }}>

                                <Accordion defaultActiveKey="0">
                                    <div style={{ marginBottom: "50px" }}>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Billing Information</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Group controlId="formGroupName">
                                                    <Form.Label style={{ fontWeight: "600" }}>Enter Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        {...register("name", {
                                                            required: "Please enter your name"
                                                        })}
                                                    />
                                                    {errors.name && <p className='errorMsgs'>{errors.name.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupMobile">
                                                    <Form.Label style={{ fontWeight: "600" }}>Enter Mobile Number</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        placeholder="Enter mobile number"
                                                        {...register("mobile", {
                                                            required: "Please enter your mobile number",
                                                            pattern: {
                                                                value: /^[0-9]{10}$/, // Mobile number regex for 10 digits
                                                                message: "Please enter a valid 10-digit mobile number"
                                                            }
                                                        })}
                                                    />
                                                    {errors.mobile && <p className='errorMsgs'>{errors.mobile.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label style={{ fontWeight: "600" }}>Email address</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter email"
                                                        {...register("email", {
                                                            required: "Please enter your email",
                                                            pattern: {
                                                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                                                message: "Please enter a valid email"
                                                            }
                                                        })} />
                                                    {errors.email && errors.email.type === "required"
                                                        && (<p className='errorMsg'>{errors.email.message}</p>)
                                                        || errors.email && errors.email.type === "pattern" && (
                                                            <p className='errorMsg'>{errors.email.message}</p>)}
                                                </Form.Group>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                    <div style={{ marginBottom: "50px" }}>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Shipping Information</Accordion.Header>
                                            <Accordion.Body>
                                                <Form.Group controlId="formGroupName">
                                                    <Form.Label style={{ fontWeight: "600" }}>Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter address"
                                                        {...register("address", {
                                                            required: "Please enter address"
                                                        })}
                                                        onChange={(e)=>setShippingInfo(prevState=>({
                                                            ...prevState,
                                                           address: e.target.value}))}
                                                    />
                                                    {errors.address && <p className='errorMsgs'>{errors.address.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupMobile">
                                                    <Form.Label style={{ fontWeight: "600" }}>City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="City name"
                                                        {...register("city", {
                                                            required: "Please enter city name",
                                                        })}
                                                        onChange={(e)=>setShippingInfo(prevState=>({
                                                            ...prevState,
                                                           city: e.target.value}))}
                                                    />
                                                    {errors.city && <p className='errorMsgs'>{errors.city.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label style={{ fontWeight: "600" }}>Zip Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Zip Code"
                                                        {...register("zip", {
                                                            required: "Please enter zip code",
                                                        })} 
                                                        onChange={(e)=>setShippingInfo(prevState=>({
                                                            ...prevState,
                                                           zip: e.target.value}))}/>
                                                    {errors.zip && (<p className='errorMsg'>{errors.zip.message}</p>)
                                                    }
                                                </Form.Group>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                    <div style={{ marginBottom: "50px" }}>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Payment Method</Accordion.Header>
                                            <Accordion.Body>
                                                <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} style={{ margin: "10px" }} />
                                                <label style={{ marginRight: "10px" }}>Cash on Delivery</label>
                                                <FontAwesomeIcon icon="fa-solid fa-money-bill" style={{ color: "#006627", fontSize: "23px", paddingTop: "10px" }} />

                                                <br />

                                                <div>
                                                    <input type="radio" name="payment" checked={paymentMethod === "dc"} onChange={() => setPaymentMethod("dc")} style={{ margin: "10px" }} />

                                                    <label style={{ marginRight: "10px" }}>Debit Card</label>
                                                    <img src="master-card-logo.png" style={{ height: '40px' }} />
                                                    <img src='rupay-logo.webp' style={{ height: '40px' }} />
                                                    <img src='visa-logo.png' style={{ height: '40px' }} />

                                                </div>
                                                {paymentMethod === "dc" && (
                                                    <div style={{ backgroundColor: "#e3e3e3", padding: "10px" }}>
                                                        <h5 >Debit Card Information</h5>
                                                        <div >
                                                            <Form.Group controlId="formGroupName">
                                                                <Form.Label style={{ fontWeight: "600" }}>Enter Card Number</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter your card number"
                                                                    {...register("cardnumber", {
                                                                        required: "Please enter your card number"
                                                                    })}
                                                                />
                                                                {errors.cardnumber && <p className='errorMsgs'>{errors.cardnumber.message}</p>}
                                                            </Form.Group>
                                                        </div>
                                                        <div>
                                                            <Form.Group controlId="formGroupName">
                                                                <Form.Label style={{ fontWeight: "600" }}>Enter Cardholder Name</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter cardholder name"
                                                                    {...register("cardholdername", {
                                                                        required: "Please enter  cardholder name"
                                                                    })}
                                                                />
                                                                {errors.cardholdername && <p className='errorMsgs'>{errors.cardholdername.message}</p>}
                                                            </Form.Group>
                                                        </div>
                                                        <div>
                                                            <Form.Group controlId="formGroupName">
                                                                <Form.Label style={{ fontWeight: "600" }}>Expiry Date</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="MM/YY"
                                                                    {...register("expirydate", {
                                                                        required: "Please enter  card's expiry date"
                                                                    })}
                                                                />
                                                                {errors.expirydate && <p className='errorMsgs'>{errors.expirydate.message}</p>}
                                                            </Form.Group>
                                                        </div>
                                                        <div>
                                                            <Form.Group controlId="formGroupName">
                                                                <Form.Label style={{ fontWeight: "600" }}>CVV</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="CVV"
                                                                    {...register("cvv", {
                                                                        required: "Please enter  card's CVV"
                                                                    })}
                                                                />
                                                                {errors.CVV && <p className='errorMsgs'>{errors.CVV.message}</p>}
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                </Accordion>


                            </div>
                        </div>
                        <div className='checkout-box'>
                            <div
                                style={{ width: "250px", borderRadius: "10px", backgroundColor: "white", transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out" }}>
                                <h6 style={{ textAlign: 'center', marginBottom: '30px' }}>Order Summary</h6>
                            </div>

                            {cart.products.map((product) => (
                                <div>
                                    <div className='d-flex' style={{justifyContent:"space-evenly"}}>
                                        <img src={product.image} alt="product-1" style={{width:"90px"}}/>
                                        <div>
                                        <h5>{product.name}</h5>
                                        <p> {product.price} X {product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div>
                                <span>Total Price:</span>
                                <span></span>
                            </div>
                            <div> <Button variant="primary" type="submit" >Place Order</Button></div>

                        </div>

                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CartDetails;