import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    adminCount();
    salaryCount();
    employeeCount();
    adminRecords();
  }, []);
  const adminCount = () => {
    axios.get("http://localhost:3306/auth/admin_count/").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3306/auth/employee_count/").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };
  const salaryCount = () => {
    axios.get("http://localhost:3306/auth/salary_count/").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };
  const adminRecords = () => {
    axios.get("http://localhost:3306/auth/admin_records/").then((result) => {
      if (result.data.Status) {
        setAdmin(result.data.Result);
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly mt-5">
        <div className=" p-2 shadow-lg border-2 w-36 aspect-video   flex flex-col  gap-2  ">
          <div className="text-xl font-medium border-b-2 flex justify-center pb-3">
            Admin
          </div>
          <div> Total : {adminTotal}</div>
        </div>
        <div className=" p-2 shadow-lg border-2  w-36 aspect-video  flex flex-col  gap-2  ">
          <div className="text-xl font-medium border-b-2 flex justify-center pb-3">
            Employees
          </div>
          <div> Total : {employeeTotal}</div>
        </div>
        <div className=" p-2 shadow-lg border-2  w-36 aspect-video  flex flex-col  gap-2  ">
          <div className="text-xl font-medium border-b-2 flex justify-center pb-3">
            Salary
          </div>
          <div> Total : {salaryTotal}</div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3 className="text-xl font-semibold mb-4">List of Admins</h3>

        <table className="min-w-full table-auto border-collapse  ">
          <thead className="">
            <tr>
              <th className="border-b border-slate-600 px-4 py-2 text-left">
                Email
              </th>
              <th className="border-b border-slate-600 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {admin.map((a, index) => (
              <tr key={index} className="bg-white border-b border-slate-300">
                <td className="border-b border-slate-600 px-4 py-2 text-left">
                  {a.email}
                </td>
                <td className="border-b border-slate-600 px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white rounded-lg px-3 py-1">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white rounded-lg px-3 py-1">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
