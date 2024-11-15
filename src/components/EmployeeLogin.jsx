import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
     
    const [values, setValues] = useState({
        email: "",
        password: "",
      });
      const [check,setCheck]= useState(false)
      const [error, setError] = useState(null);
    
      const navigate = useNavigate();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if(!check){
            setError("please agree to terms first")
            return;
          }
        axios
          .post("http://localhost:3306/employee/employee_login/", values)
          .then((result) => {
            if (result.data.loginStatus) {
                localStorage.setItem("valid",true)
              navigate("/employee_detail/"+ result.data.id);
            } else {
              setError(result.data.Error);
            }
          })
          .catch((error) => console.log(error));
      };
      return (
        <div className="flex justify-center items-center h-dvh  bg-cover bg-gradient-to-b from-[#1532ec] to-white">
          <div className="*:m-3 flex flex-col items-center border-2 rounded-md px-6 pt-3 pb-8 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95">
            <div className="text-red-800">{error && error}</div>
    
            <h2 className="text-2xl ">
              <strong>Login Page</strong>
            </h2>
    
            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col">
                <label htmlFor="e-mail" className="text-lg font-medium pb-1">
                  E-mail :
                </label>
                <input
                  type="email"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  name="email"
                  autoComplete="off"
                  className="rounded-md outline-1 outline p-1 px-2"
                  placeholder="e-mail"
                />
              </div>
              <div className="flex flex-col mt-2 ">
                <label htmlFor="password" className="text-lg font-medium pb-1">
                  Password :
                </label>
                <input
                  type="password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  name="password"
                  placeholder="password"
                  className="rounded-md outline-1 outline p-1 px-2"
                />
              </div>
              <div className='my-2 '>
                <input type="checkbox" name="tick" checked={check} onChange={(e)=>setCheck(e.target.checked)} />
                <label htmlFor="tick" className='px-2'>I accept all the terms & conditions</label>
              </div>
              <button type="submit" className="bg-green-700 rounded-lg px-3 my-2">
                Submit
              </button>
              
            </form>
          </div>
        </div>
      );
}

export default EmployeeLogin