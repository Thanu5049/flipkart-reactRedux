import React from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import { Login } from './Login';
import Button from 'react-bootstrap/Button';
import Signup from './Signup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../store/fetchProducts';


export const NavBar = () => {
  let navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [search, setSearch] = useState();

  const products = useSelector(state => state.products.data)
  const dispatch = useDispatch();

  const [showMatchedItem, setShowMatchedItem] = useState([]);
  const searchArray = products.map((product) => {
    return product;
  })
  console.log(searchArray)
  const cartData = useSelector(state => state.cart.products)
  const [input, setInput] = useState("");

  const searchAlgo = (value) => {
    if (value.trim().length > 0) {
      const filteredResults = searchArray.filter((keyword) =>
        keyword.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setShowMatchedItem(filteredResults.length > 0 ? filteredResults : ["No results found"]);
    } else {
      setShowMatchedItem([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search && search.trim().length > 0) {
      dispatch(setSearchTerm(search));
      navigate("/filtered-data");
    }
  }


  return (
    <>
      <div className='d-flex' style={{ height: "60px", backgroundColor: "white", justifyContent: 'center' }}>
        <div className='logo-part'>
          <a onClick={(e) => { e.preventDefault(); navigate("/") }}>
            <img src='navlogo-f.png' width='auto' style={{ margin: "5px", cursor: 'pointer' }} onClick={() => navigate("/")} />
          </a>
        </div>

        <div className='search-part' style={{ position: 'relative', zIndex: 100 }}>
          <FontAwesomeIcon
            icon="fa-solid fa-magnifying-glass"
            style={{ position: 'absolute', top: '55%', transform: 'translateY(-50%)', fontSize: '20px', color: '#888', marginLeft: '10px' }}
          />

          <Col xl="auto">
            <Form.Control
              type="text"
              placeholder="Search grocery products"
              className=" mr-sm-2"
              style={{ width: '100%', paddingLeft: '40px', height: '40px', fontSize: '18px', outline: "none" }}
              onChange={(e) => {
                const value = e.target.value; 
                setInput(value);             
                setSearch(value);            
                searchAlgo(value);
                handleSearch(e);
              }}
              value={input}
            />
          </Col>
          {showMatchedItem.length > 0 && (
            <div
              style={{
                borderRadius: '30px'
              }}
            >
              {showMatchedItem.map((value, index) => (
                <Col
                  key={index}
                  xl="auto"
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingTop: "5px",
                    height: '40px',
                    fontSize: '18px',
                    outline: "none",
                    backgroundColor: 'white',
                    position: 'relative'
                  }}
                  className='matchedItems'
                  onClick={() => { setInput(value.title); setShowMatchedItem([]); }}
                >

                  <FontAwesomeIcon
                    icon="fa-solid fa-magnifying-glass"
                    style={{
                      position: 'absolute',
                      transform: 'translateY(-50%)',
                      fontSize: '20px',
                      color: '#888',
                      left: '10px',
                      marginTop: '13px'
                    }}
                  />
                  {value.title}
                </Col>
              ))}
            </div>
          )}
        </div>


        <div className='ls-part d-flex' style={{ gap: '10px', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
          <FontAwesomeIcon icon="fa-solid fa-user" style={{ color: "#000000", cursor: 'pointer' }} />
          <div className='d-flex'>
            <Button
              style={{ cursor: "pointer" ,marginRight:"10px"}}
              onClick={() => setShowLoginModal(true)} >
              Login
            </Button>  
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => setShowSignModal(true)} >
              SignUp
            </Button>
          </div>
        </div>
        <div className='cart-part d-flex' style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '10px', cursor: 'pointer' }} onClick={() => { navigate('/cart') }}>
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" style={{ color: "#000205", fontSize: '18px' }} />
          {cartData.length > 0 ? (<span style={{ width: "20px", backgroundColor: "red", color: "white", borderRadius: "100px", height: "20px", textAlign: "center", fontSize: '12px', marginBottom: '20px' }}>{cartData.length}</span>) : null}
        </div>
      </div>
      <Login show={showLoginModal} setShowSignModal={setShowSignModal} onHide={() => setShowLoginModal(false)} />
      <Signup shows={showSignModal} setShowLoginModal={setShowLoginModal} onHide={() => setShowSignModal(false)} />
    </>
  )
}
