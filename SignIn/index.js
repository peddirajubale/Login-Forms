import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './index.css'

export default function SignIn() {
  const[data, setUserData]=useState({
    name:'',
    password:''
  })

  const onChangeData=(e)=>{
    setUserData({...data, [e.target.name]:e.target.value})
  }
  

  const addUserData=async(e)=>{
    e.preventDefault()
    const newData={
      newUser:data.name,
      newPassword:data.password
    }
    console.log(newData)
    setUserData('')
   try{
    const response = await axios.post('http://localhost:7000/signin', newData)
    console.log(response)
   }catch(error){
    console.log(error)
   }
  }

  return (
  <div className='container'>
    <div className='form-container'>
      <h1 className='heading'>SignIn</h1>
      <form onSubmit={addUserData}>
        <div className='input-container'>
          <label>Name:</label>
          <br/>
          <input type='text' className='input-box' name='name' placeholder='Enter here..' onChange={onChangeData}/>
        </div>

        <div className='input-container'>
          <label>Password:</label>
          <br/>
          <input type='text' className='input-box' name='password' placeholder='Enter here..'  onChange={onChangeData}/>
        </div>
        <button className='btn' type='submit'>SingIn</button>
      </form>
    </div>
    </div>
  )
}
