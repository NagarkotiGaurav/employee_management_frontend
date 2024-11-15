import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Start() {
    const navigate = useNavigate()
    axios.defaults.withCredentials= true;
  useEffect(()=>{
    axios.get('http://localhost:3306/verify/')
      .then(result=>{
        console.log(result.data)
          if(result.data.Status){
            if(result.data.role ==="admin"){
              navigate('/dashboard')
            }
            else{
              navigate('/employee_detail/'+result.data.id)
            }
          }
      })
        .catch(err=>console.log(err))
  })
  return (
    <div className="flex justify-center items-center h-screen bg-login-bg bg-cover">
    <div className="flex flex-col justify-center items-center w-1/4 h-48 rounded-md bg-gradient-to-r from-blue-900 to-blue-700 opacity-95 p-6 space-y-4">
      <h2 className="text-2xl text-white text-center font-bold">Login As</h2>
      
      <div className="flex space-x-4">
        <button type="button" className="bg-red-800 text-white px-4 py-2 rounded-lg" onClick={()=>navigate('/employee_login')}>Employee</button>
        <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={()=>navigate('/admin_login')}>Admin</button>
      </div>
    </div>
  </div>
  
  );
}

export default Start;
