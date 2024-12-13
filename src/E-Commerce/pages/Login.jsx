import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useForm} from "react-hook-form";
import { useState } from 'react';
import Signup from './Signup';
export const Login = ({show,setShowSignModal,onHide}) => {
  const{
    register:registerLogin,
    handleSubmit:handleSubmitLogin,reset,
    formState:{errors:loginErrors}
  }=useForm();

    const onLoginSubmit=(data)=>{
      const userEmail=data.loginemail;
      const passs=data.loginpassword;
      const users=JSON.parse(localStorage.getItem("users"))
      const user = users.find((user) => user.email === userEmail && user.password === passs);
      // console.log(user);

    }
  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmitLogin(onLoginSubmit)} style={{ margin: "15px" }}>
            <Form.Group className="mb-3" >
              <Form.Label style={{ fontWeight: "600" }}>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...registerLogin("loginemail", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Please enter a valid email"
                  }
                })} />
              {loginErrors.loginemail && loginErrors.loginemail.type === "required"
                && (<p className='errorMsg'>{loginErrors.loginemail.message}</p>)
                || loginErrors.loginemail && loginErrors.loginemail.type === "pattern" && (
                  <p className='errorMsg'>{loginErrors.loginemail.message}</p>)}
            </Form.Group>

            <Form.Group className="mb-3"  >
              <Form.Label style={{ fontWeight: "600" }}>Enter Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                {...registerLogin("loginpassword", { required: "Password is required" })} />
              {loginErrors.loginpassword && loginErrors.loginpassword.type === "required"
                && (<p className='errorMsg'>Password is required</p>)}
            </Form.Group>

            
        <div key={`default-checkbox`} className="mb-3">
          <Form.Check
            type={"checkbox"}
            id={`default-checkbox`}
            label={`Remember me`}
          />
          </div>
            <Modal.Footer style={{ border: "none",display:"flex" ,justifyContent:'center'}}>
              <br />
              <Button variant="primary" type="submit" className="login-buttons w-100"> Login</Button>     
              Don't have an account? 
              <a style={{color:"blue",cursor:"pointer"}} onClick={()=>{setShowSignModal(true) ; onHide(true)}}>Sign Up</a>
                </Modal.Footer>
          </Form>
        </Modal.Body>
        
      </Modal>
    </div>
  )
}
