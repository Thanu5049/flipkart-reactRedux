import React, { useEffect } from 'react';
import { Card } from './Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setProducts } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../ProductList';
import {fetchProducts} from '../store/fetchProducts';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';


export const CardDisplay = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
  dispatch(fetchProducts())
  },[dispatch])
   const products=useSelector(state=>state.products.data)

   const { isLoading, data, isError } = useSelector((state) => state.products);


   let navigate=useNavigate();

   if(isLoading)
   {
    return <Spinner animation="border" style={{margin:"10% 50%"}}/>

   }

   const handleCheckDetails=(product)=>{
    //  navigate('/product-details')
   }
     return (
         <div style={{padding:"40px",display:"flex",flexWrap:"wrap",gap:"15px"}} className='d-flex'>
          
            <Container>
           <div>
           {products.map((product, index) => { 
               if (index % 4 === 0) {
                 return (
                   <Row key={index} style={{ marginBottom: "20px" }}>
                     {/* Map 4 products into columns for each row */}
                     {products.slice(index, index + 4).map((product) => (
                       <Col key={product.id} xs={12} sm={6} md={3} lg={3} style={{ marginBottom: '20px' }}>
                         <Card product={product} onClick={handleCheckDetails(product)}/>
                       </Col>
                     ))}
                   </Row>
                 );
               }
               return null;
             })}
           </div>
         </Container> 
          </div>
     )
}
