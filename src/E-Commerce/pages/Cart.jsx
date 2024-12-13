import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
import { deleteItem, removeItem } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const cart = useSelector(state => state.cart)
    console.log(cart,"cart")
    const dispatch = useDispatch();
    const checkoutStyle = {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "70%"
    }

    const [totalSum, setTotalSum] = useState(0);

   // console.log(totalSum)
    const [quantities, setQuantities] = useState(
        cart.products.reduce((acc, product) => {
            acc[product.id] = 1;
            return acc;
        }, {})
    );
    let navigate=useNavigate();

    const { register, handleSubmit,reset, formState: { errors } } = useForm();

console.log(quantities)
    const increase = (id) => {
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities, [id]: prevQuantities[id] + 1 };
            return newQuantities;
        });
    };


    const decrease = (id) => {

        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities, [id]: Math.max(1, prevQuantities[id] - 1) };
            return newQuantities;
        });
    };

    const removeitem=(id)=>{
        // const findId=quantities.filter((productid)=>productid===id);

        setQuantities((prevQuantities)=>{
            const newQuantities={...prevQuantities,[id]:0}
            return newQuantities;
        })
    }

    const totalItems = Object.values(quantities).reduce((acc, currValue) => acc + currValue, 0);

    const calculateTotalSum = () => {
        let sum = 0;
        cart.products.forEach((product) => {
            sum += product.price * quantities[product.id];
        });
        setTotalSum(sum);
    };


    const handleRemoveItem = (e,item) => {
        e.preventDefault();
        e.stopPropagation();
        removeitem(item.id)
        dispatch(deleteItem(item));
      }
    useEffect(() => {
        calculateTotalSum();
        console.log(cart,"use");
        
    }, [quantities]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [address, setAddress] = useState(['MAin St 123']);

    const[defaultAddress,setDefaultAddress]=useState({"city":"MainSt123","zip":"001532"});
    const handleSave = () => {
        if (selectedIndex !== null) { 
            const selectedAddress = address[selectedIndex];
            if (typeof selectedAddress === 'string' && selectedAddress.includes(',')) {
                const [name, mobile, city, state, zip] = selectedAddress.split(',').map(s => s.trim());
                setDefaultAddress({ name, mobile, city, state, zip });
            } else {
                setDefaultAddress({ city: selectedAddress, state: 'MainSt123', zip: '001532' });
            }
        } 
    };

  

    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleItemClick = (index) => {
        setSelectedIndex(index); 
    };




    const onSubmit = (data) => {
        const fullAddress = `${data.name}, ${data.mobile}, ${data.city}, ${data.state}, ${data.zip}`;
        setAddress((prevAddress) => [...prevAddress, fullAddress]);
        console.log(address)
        reset();

    };
    


    
    return (
        <div style={{ marginLeft: "5%", marginBottom: "5%" }}>
            {cart.products.length > 0 ?

                <div className='cart-checkout d-flex'>
                    <div style={{ padding: "20px" }} >
                        <h3>SHOPPING CART</h3>
                        <div>
                            <div className='d-flex' style={{ gap: "55px", width: "100%" }} >
                                <div style={{ width: "500px" }} className='product-headings'>PRODUCT</div>
                                <p className='product-headings'>PRICE</p>
                                <p className='product-headings'>QUANTITY</p>
                                <p className='product-headings'>REMOVE</p>
                            </div>
                            {cart.products.map((product, index) => (
                                <div key={index} className='d-flex product-card' style={{ width: "100%", gap: "25px", padding: "40px 0px 40px 60px" }}>
                                    <div className='d-flex ' style={{ width: "430px", alignItems: "center" }}>
                                        <img src={product.image} alt={product.title} style={{ width: "100px", height: "auto" }} />
                                        <h4>{product.name}</h4>
                                    </div>
                                    <div className='d-flex' style={{ padding: "25px", gap: "40px" }}>
                                        <p className='d-flex' style={{ justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                        <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
                                            {product.price}</p>
                                        <div className='d-flex' style={{ gap: "5px", justifyContent: "center", alignItems: "center" }}>
                                            <button style={{ height: "30px", width: "30px", backgroundColor: "white" }} onClick={() => decrease(product.id)}>-</button>
                                            <p style={{ padding: "5px", marginTop: "15px" }}>{quantities[product.id]}</p>
                                            <button style={{ height: "30px", width: "30px", backgroundColor: "white" }} onClick={() => increase(product.id)}>+</button>
                                        </div>
                                        <FontAwesomeIcon icon="fa-solid fa-trash-can" style={{ color: "#ff0000", marginLeft: "35px", marginTop: "25px",cursor:'pointer' }} onClick={(e)=>handleRemoveItem(e,product)}/>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='checkout-box'>
                        <div
                            style={{ width: "250px", borderRadius: "10px", padding: "20px", backgroundColor: "white", transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out" }}>
                            <h6 style={{ textAlign: 'center', marginBottom: '30px' }}>CART TOTAL</h6>
                            <h6 >TOTAL ITEMS: {totalItems}</h6>
                        </div>

                        <div style={{ borderTop: '1px solid grey',width:"80%" }}>
                            <p>Shipping:</p>
                            <p>Shipping to : {defaultAddress ? `${defaultAddress.city}, ${defaultAddress.zip}` : 'No address selected'}</p>
                            <a onClick={handleShow} style={{ color: "blue" }}>Change Address</a>
                        </div>

                        <div className='d-flex' style={checkoutStyle}>
                            <p style={{ paddingTop: "10px" }}>Total Price:</p>
                            <div className='total-price'>
                            <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />{totalSum.toFixed(2)}</div>
                        </div>

                        <div> <Button variant="primary" onClick={()=>navigate("/product-details")}>Proceed to Checkout</Button></div>

                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Manage Addresses</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Accordion defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" style={{ color: "#0457e7", marginRight: "10px" }} />
                                        ADD NEW ADDRESS</Accordion.Header>
                                    <Accordion.Body>
                                             <Form noValidate onSubmit={handleSubmit(onSubmit)} className="w-90">

                                            {/* Name Input */}
                                            <Row className="mb-6">
                                                <Form.Group as={Col} md="6"  controlId="formGroupName">
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
                                                <Form.Group as={Col} md="6" className="mb-3" controlId="formGroupMobile">
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
                                            </Row>

                            

                                            {/* City Input */}
                                            <Row className="mb-6">
                                                <Form.Group className="mb-3" as={Col} md="6"  controlId="formGroupCity">
                                                    <Form.Label style={{ fontWeight: "600" }}>Enter City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter city"
                                                        {...register("city", {
                                                            required: "Please enter your city"
                                                        })}
                                                    />
                                                    {errors.city && <p className='errorMsgs'>{errors.city.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" as={Col} md="6" controlId="formGroupState">
                                                    <Form.Label style={{ fontWeight: "600" }}>Enter State</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter state"
                                                        {...register("state", {
                                                            required: "Please enter your state"
                                                        })}
                                                    />
                                                    {errors.state && <p className='errorMsgs'>{errors.state.message}</p>}
                                                </Form.Group>
                                            </Row>

                                            {/* State Input */}
                                            <Row className="mb-6">
                                                <Form.Group className="mb-3" as={Col} md="6" controlId="formGroupState">
                                                    <Form.Label style={{ fontWeight: "600" }}>Enter State</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter state"
                                                        {...register("state", {
                                                            required: "Please enter your state"
                                                        })}
                                                    />
                                                    {errors.state && <p className='errorMsgs'>{errors.state.message}</p>}
                                                </Form.Group>


                                                <Form.Group className="mb-3" as={Col} md="6" controlId="formGroupZip">
                                                    <Form.Label style={{ fontWeight: "600" }}>Enter Zip Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter zip code"
                                                        {...register("zip", {
                                                            required: "Please enter your zip code",
                                                            pattern: {
                                                                value: /^[0-9]{5}$/, // Zip code regex for 5 digits
                                                                message: "Please enter a valid 5-digit zip code"
                                                            }
                                                        })}
                                                    />
                                                    {errors.zip && <p className='errorMsgs'>{errors.zip.message}</p>}
                                                </Form.Group>
                                            </Row>

                                            <Button variant="primary" style={{ marginTop: "15px" }} type='submit'>
                                            Save Address
                                        </Button>

                                        </Form>


                                        
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <ListGroup>

                                <br />
                                {address.map((addr, index) => (
                                    <ListGroup.Item key={index} onClick={() => handleItemClick(index)} // Set background to blue when clicked
                                        style={{
                                            backgroundColor: selectedIndex === index ? '#0d6efd' : '',
                                            color: selectedIndex === index ? 'white' : '',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                        {addr}

                                        {<FontAwesomeIcon
                                            icon="fa-solid fa-circle-dot"
                                            style={{
                                                color: selectedIndex === index ? 'white' : '#005eff', // Icon color change when selected
                                                marginRight: '10px' // Space between icon and address text
                                            }} />}</ListGroup.Item>
                                ))}

                            </ListGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Make As Default
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                : <div style={{ textAlign: 'center' }}><img src='empty-cart-r.png' /></div>}
        </div>

    )
}

export default Cart