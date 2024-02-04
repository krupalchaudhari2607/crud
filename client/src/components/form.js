import React from 'react'
import '../App.css';
function form({handleSubmit,handleOnchange,handleClose,rest}) {


  return (
    <div className='form'>
        <form onsubmit={handleSubmit}>
          <div className="inputBox">
            <label htmlFor="name">Name : </label>
              <input type="text" name="name" placeholder="Name" onChange={handleOnchange} value={rest.name}/>
          </div>
          <div className="inputBox">
            <label htmlFor="email">Email : </label>
              <input type="text" name="email" placeholder="Email"  onChange={handleOnchange} value={rest.email}/>
          </div>
          <div className="inputBox">
            <label htmlFor="mobile">Mobile : </label>
              <input type="text" name="mobile" placeholder="Phone" onChange={handleOnchange} value={rest.mobile}/>
          </div>
          
          <button  className="btn" onClick={handleSubmit}>Submit</button>
          <br />  
          <button className="btn" onClick={handleClose}>Close</button>
        </form>
    </div>
  )
  }

export default form
