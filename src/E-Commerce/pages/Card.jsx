import React from 'react'
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import {addItem} from '../store/cartSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';

export const Card = ({product}) => {
  const dispatch=useDispatch();

  const products=useSelector(state=>state)
  //console.log(products.cart.products,"card")

  const handleToCart=(e,product)=>{
    e.stopPropagation(); 
    e.preventDefault();  
      dispatch(addItem(product));

  }

  return (
    <>
    
    <div style={{ width:"280px",borderRadius:"10px",height:"400px",padding:"20px",backgroundColor:"white",  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
     }}  className='card'>
       <div className='d-flex' style={{flexDirection:'column'}}>
        <div className="image-part"style={{textAlign:"center"}}>
            <img src={product.images[0]} width='150px' height='150px'/>
        </div>
        <div className='d-flex'  style={{flexDirection:'column',gap:'10px',alignItems:'center'}}>
        <div style={{fontSize:'19px',width:"200px",transition: "color 0.3s ease-in-out",height:"50px",textAlign:"center",fontWeight:"500"}} className="product-title"> {product.title.length > 15 
            ? product.title.substring(0, 40) + "..." 
            : product.title}</div>
        <div className="rating-div d-flex" style={{height:'25px',width:'50px',backgroundColor:'green',fontSize:'15px',color:'white',alignItems:'center',gap:"5px",paddingLeft:"5px",borderRadius:"5px"}}>
           
            <FontAwesomeIcon icon="fa-solid fa-star" style={{color: "#ffffff",}} />
            <div className="number">{product.rating.toFixed(1)}</div> </div>
        <div className="price-part d-flex">

        <FontAwesomeIcon icon="fa-solid fa-dollar-sign" style={{color: "#00040a",paddingTop:"13px",paddingRight:"5px"}}/>
        <div className='rupees' style={{fontSize:'28px'}}>{product.price}</div>
        </div>
        
       </div>
       <div className='d-flex' style={{justifyContent:'center',marginTop:'20px'}}>
       <Button variant="warning" style={{borderRadius:'30px',width:'180px'}} onClick={(e)=>handleToCart(e,product)} type='button' >Add to cart</Button>
       </div>
       </div>
    </div>

    </>
  )
}
