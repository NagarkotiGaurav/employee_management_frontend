import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
    const {id }=useParams()
    const navigate = useNavigate()
    const [ employee,setEmployee]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:3306/employee/detail/'+id)
                .then(result=> setEmployee(result.data[0]))
                    .catch(err=> console.log(err))
    },[])

    const handleLogout = (e)=>{
        axios.get("http://localhost:3306/employee/logout/")
        .then(result=>{
          if(result.data.Status){
            localStorage.removeItem("valid")
            navigate('/')
          }
        })

    }
  return (

    <div className='flex flex-col  '>
        <div className='flex justify-center shadow-lg  p-3'>
            <h3 className='text-xl font-medium'>Employeee Management System </h3>
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <img src={'http://localhost:3306/images/'+employee.image} alt="" />
          <div className='flex flex-col gap-6 text-xl font-medium   '>
            <h3 >Name : {employee.name}</h3>
            <h3>Email : {employee.email}</h3>
            <h3>Salary : {employee.salary}</h3>
          </div>
          <div className='flex gap-6'>
            <button className='bg-blue-700 text-white px-2 rounded-lg text-xl'>Edit</button>
            <button className='bg-red-700 text-white px-2 rounded-lg text-xl' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail