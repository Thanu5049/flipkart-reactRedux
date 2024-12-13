import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayUSers = () => {
    //here state means accessing the whole store and the users means the mini reducer functon
    const data=useSelector((state)=>{
        return state.users;
    })
    console.log(data)
  return (
    <div>
        {
            data.map((user,id)=>{
                return <li key={id}>
                    <div className='d-flex ' style={{width:"300px",justifyContent:"space-between"}}>
                    <div>{user}</div>
                        
                        <button>
                        <FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#f50000",}} />
                        </button>
                        </div>
                </li>
            })
        }
    </div>
  )
}

export default DisplayUSers