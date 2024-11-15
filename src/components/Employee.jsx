import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Employee() {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3306/auth/employee/")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          console.log("success");
        } else {
          console.log(result.data);
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3306/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3 ">
      <div className="flex justify-center">
        <h3 className="text-2xl  font-semibold">Employee list</h3>
      </div>

      <Link
        to={"/dashboard/add_employee"}
        className="p-1 rounded-md self-center font-medium text-white bg-green-600"
      >
        Add Employee
      </Link>
      <div className="mt-3  ">
        <table className=" border-collapse w-full border-slate-500 border-b-[1.5px] rounded-md">
          <thead>
            <tr>
              <th className=" border-slate-500 border-b-[1.5px] rounded-md">
                Name
              </th>
              <th className=" border-slate-500 border-b-[1.5px] rounded-md">
                Image
              </th>
              <th className=" border-slate-500 border-b-[1.5px] rounded-md">
                Email
              </th>
              <th className=" border-slate-500 border-b-[1.5px] rounded-md">
                Address
              </th>
              <th className=" border-slate-500 border-b-[1.5px] rounded-md">
                Salary
              </th>
              <th className=" border-slate-500 border-b-[1.5px] rounded-md">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employee.map((c) => (
              <tr>
                <td className=" border-slate-500 border-b-[1.5px] px-3 rounded-md">
                  {c.name}
                </td>
                <td className=" border-slate-500 border-b-[1.5px] px-3 rounded-md">
                  <img
                    src={`http://localhost:3000/images/` + c.image}
                    alt=""
                    className="h-20 w-15"
                  />
                </td>
                <td className=" border-slate-500 border-b-[1.5px] px-3 rounded-md">
                  {c.email}
                </td>
                <td className=" border-slate-500 border-b-[1.5px] px-3 rounded-md">
                  {c.address}
                </td>
                <td className=" border-slate-500 border-b-[1.5px] px-3 rounded-md">
                  {c.salary}
                </td>
                <td className=" border-slate-500 border-b-[1.5px] px-3 rounded-md">
                  <Link to={`/dashboard/edit_employee/` + c.id}>
                    <button className="bg-blue-600  text-white rounded-lg px-2 me-1 ">
                      Edit{" "}
                    </button>
                  </Link>
                  <button
                    className="bg-red-600  text-white rounded-lg px-2"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
