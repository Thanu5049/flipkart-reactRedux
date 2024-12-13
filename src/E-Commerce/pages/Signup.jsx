import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useForm} from "react-hook-form";
import { useState } from 'react';
const Signup = ({shows,setShowLoginModal,onHide}) => {
const{
    register:registerSignup,
    handleSubmit:handleSubmitSignup,
    formState:{errors:signUpErrors},watch,reset
  }=useForm();
  const password = watch("password"); // Watch password for confirmation
  // console.log(password);
  
  const onSignupSubmit=(data)=>{
  
    let users = JSON.parse(localStorage.getItem("users")) || [];  
     const value=({
      "email":data.email,
      "password":data.password,
      "username":data.name
    })
    const userExists = users.some(user => 
      user.email === value.email && 
      user.password === value.password && 
      user.username === value.username
    );
  
    if (userExists) {
      alert("The user data already exists");
    } else {
      users.push(value);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup was successful");
      reset();
    }
  }
  const handleClose = () =>{ 
    setShow(false);
    reset();} 
    const [show, setShow] = useState(false);     

  return (
    <>
       
       <div>
      <Modal
        show={shows}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Signup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmitSignup(onSignupSubmit)} style={{ margin: "15px" }}>
          <Form.Group className="mb-3" >
        <Form.Label style={{fontWeight:"600"}}>Enter your username</Form.Label>
        <Form.Control
         type="text"
          placeholder="Enter username" 
          {...registerSignup("name",{
            required:"Please enter your name",
            maxLength:{
              value:4,
            message:"Name cannot exceed 4 characters"}
          })}/>
          {/* {signUpErrors.name && signUpErrors.name.type==="required" && (<p className='errorMsg'>{signUpErrors.name.message}</p>)} */}
          {signUpErrors.name && (
  <p className='errorMsg'>{signUpErrors.name.message}</p>
)}
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label style={{fontWeight:"600"}}>Enter Email address</Form.Label>
        <Form.Control
         type="email"
          placeholder="Enter email" 
          {...registerSignup("email",{
            required:"Please enter your email",
            pattern:{
               value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please enter a valid email"
            }
          })}/>
          {signUpErrors.email && signUpErrors.email.type==="required" && (<p className='errorMsg'>{signUpErrors.email.message}</p>) || signUpErrors.email && signUpErrors.email.type === "pattern" && (
        <p className='errorMsg'>{signUpErrors.email.message}</p> )}
      </Form.Group>
      <Form.Group className="mb-3"  >
        <Form.Label style={{fontWeight:"600"}}>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...registerSignup("password",{required:"Password is required"})}/>
        {signUpErrors.password && signUpErrors.password.type==="required" && (<p className='errorMsg'>Password is required</p>)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupConfirmPassword" >
        <Form.Label style={{fontWeight:"600"}}>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" 
        {...registerSignup("confirmpass",{required:"Please enter your password",
          validate: (value) => value === password || "Passwords do not match"
        })}/>
        {signUpErrors.confirmpass &&  (<p className='errorMsg'>{signUpErrors.confirmpass.message}</p>)}
      </Form.Group>
            <Modal.Footer style={{ border: "none",display:"flex" ,justifyContent:'center'}}>
              <br />
              <Button variant="primary" type="submit" className="login-buttons w-100"> Signup</Button>        </Modal.Footer>
              <p>Already have an account?
              <a style={{color:"blue",cursor:"pointer"}} onClick={()=>{setShowLoginModal(true) ; onHide(true)}}>Login</a>
              </p>
          </Form>
        </Modal.Body>
        
      </Modal>
    </div>
    </>
  )
}

export default Signup;