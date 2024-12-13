import React from 'react'
import Button from 'react-bootstrap/Button';
import { fakeUserData } from './api';
import { useDispatch } from 'react-redux';
import { addUser } from './store/slices/UserSlice';
import DisplayUSers from './components/DisplayUSers';
const Navbar = () => {
const dispatch=useDispatch();
    const addNewUser=(payload)=>{
console.log(payload);
dispatch(addUser(payload)); //here the dispatch function is used to send actions to the redux store and save them in the store
    }
  return (
    <div>
        <div className='d-flex'>
        <Button variant="primary" onClick={()=>addNewUser(fakeUserData())}>Add Users</Button>
        <Button variant="danger">Delete users</Button>
        </div>
        <div>
        <h3>List of users</h3>
        <ul> <DisplayUSers /></ul>
        </div>
    </div>
  )
}

export default Navbar