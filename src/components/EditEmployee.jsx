import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    
  });
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:3306/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id:result.data.Result[0].category_id
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit =(e)=>{
    e.preventDefault()
    axios.put("http://localhost:3306/auth/edit_employee/" + id,employee)
        .then(result =>{
            if(result.data.Status){
                navigate('/dashboard/employee')
              }
              else{
                console.log(result.body.error)
              }     
        })
        .catch(err=>console.log(err))
  }

  const { id } = useParams();

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
              value={employee.name}
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
              name="email" value={employee.email}
              className="rounded-md outline-1 outline-slate-400 outline ps-2"
              placeholder="enter email"
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
              name="salary" value={employee.salary}
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
              name="address" value={employee.address}
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
              className="outline-1 outline-slate-400 outline rounded-lg " value={employee.category_id}
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

          
          <button type="submit" className="bg-green-700 rounded-lg px-3 my-2">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
