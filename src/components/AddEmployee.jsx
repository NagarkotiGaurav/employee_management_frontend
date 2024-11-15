import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:3306/auth/category/")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
          
        } else {
          
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit =(e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name',employee.name)
    formdata.append('email',employee.email)
    formdata.append('password',employee.password)
    formdata.append('address',employee.address)
    formdata.append('salary',employee.salary)
    formdata.append('image',employee.image)
    formdata.append('category_id',employee.category_id)
    axios.post('http://localhost:3306/auth/add_employee/',formdata)
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboard/employee')
              }
              else{
                console.log(result.body.error)
              }
        })
          .catch(err=>console.log(err))
  } 
  return (
    <div className=" h-3/4 flex justify-center    items-center ">
      <div className=" flex flex-col items-center border-2 rounded-md px-6  ">
        <h2 className="text-2xl ">
          <strong>Add Employee</strong>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col">
            <label htmlFor="Name" className="text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              name="Name"
              className="rounded-md outline-1 outline-slate-400 outline ps-2"
              placeholder="enter Employee name"
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              name="email"
              className="rounded-md outline-1 outline-slate-400 outline ps-2"
              placeholder="enter email"
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
              name="password"
              className="rounded-md outline-slate-400 outline-1 outline ps-2"
              placeholder="enter password"
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="salary" className="text-lg font-medium">
              Salary
            </label>
            <input
              type="number"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
              name="salary"
              className="rounded-md outline-1 outline-slate-400 outline ps-2"
              placeholder="enter salary"
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="address" className="text-lg font-medium">
              Address
            </label>
            <input
              type="text"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
              name="address"
              className="rounded-md outline-1 outline-slate-400 outline ps-2"
              placeholder="enter address"
            />
          </div>

          <div className=" flex flex-col">
            <label htmlFor="category" className="text-lg font-medium">
              Category
            </label>
            <select
              name="category"
              className="outline-1 outline-slate-400 outline rounded-lg "
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option className="" value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="image " className="text-lg font-medium">
              Image
            </label>
            <input
              type="file"
              name="image" onChange={(e) => setEmployee({...employee,image : e.target.files[0]})}
              className="rounded-md outline-1 outline-slate-400 outline "
            />
          </div>
          <button type="submit" className="bg-green-700 rounded-lg px-3 my-2">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
