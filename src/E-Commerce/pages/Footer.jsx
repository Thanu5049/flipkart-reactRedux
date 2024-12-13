import React from 'react'
import './Footer.css';

export const Footer = () => {
    const get=['About Flipkart', 'Careers','Press Releases', 'Flipkart Science'];
    const connect=['Facebook','Twitter','Instagram']
    const make=['Sell on Flipkart','Sell under Flipkart Accelerator','Protect and Build Your Brand','Flipkart Global Selling','Supply to Flipkart']
    const help=['Your Account','Returns Centre','Recalls and Product Saftey Alerts','Recalls and Product Saftey Alerts','Flipkart App Download','Help']
  return (
    <>
    <div className='footer d-flex' style={{backgroundColor:'black',color:'white',height:'300px',justifyContent:'center',alignItems:'center',gap:'50px'}}>
    <div className='get-part foot-first'>
            <div className='footer-headings'>Get to Know Us</div>    
            {get.map((value,key)=>(
                <>
                <a key={key} style={{fontSize:'18px',color:'white', textDecoration: 'none',}} href='#'>{value}</a>
                <br />
                </>
            ))}
    </div>    
    <div className='connect-part foot-first'>
    <div className='footer-headings'>Connect with Us</div>    
            {connect.map((value,key)=>(
                <>
                <a key={key} style={{fontSize:'18px',color:'white', textDecoration: 'none'}}  href='#'>{value}</a>
                <br />
                </>
            ))}
    </div>
    <div className='make-part foot-last'>
    <div className='footer-headings'>Make Money with Us</div>    
            {make.map((value,key)=>(
                <>
                <a key={key} style={{fontSize:'18px',color:'white', textDecoration: 'none'}}  href='#'>{value}</a>
                <br />
                </>
            ))}
    </div>
    <div className='help-part foot-last'>
    <div className='footer-headings'>Let Us Help You</div>    
            {help.map((value,key)=>(
                <>
                <a key={key} style={{fontSize:'18px',color:'white', textDecoration: 'none'}}  href='#'>{value}</a>
                <br />
                </>
            ))}
    </div>
    </div>
    <div className='d-flex' style={{backgroundColor:'black',borderTop:'1px solid grey',justifyContent:'center',alignItems:'center',gap:'50px'}}>
        <div ><p > &copy; 2024 Flipkart All rights reserved.</p></div>
        <div className="logo-footer">
        <img src='navlogo-f.png' width='auto' style={{margin:"5px"}} />
        </div>
        <div className="country-part d-flex" style={{justifyContent:'center',alignItems:'center',gap:'10px',border:'1px solid grey',height:'40px',width:'100px',borderRadius:'5px'}}>
            <img src='indian-flag.webp' width='30px' height='20px'/>
            <div style={{color:'white'}}>India</div>
        </div>
    </div>
    </>
  )
}
