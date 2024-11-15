import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { FiLayout } from 'react-icons/fi';
import { RiContactsFill } from 'react-icons/ri';
import { FaPowerOff } from 'react-icons/fa6';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate()
  axios.defaults.withCredentials= true;
  const handleLogout = (e)=>{
    axios.get("http://localhost:3306/auth/logout/")
        .then(result=>{
          if(result.data.Status){
            localStorage.removeItem("valid")
            navigate('/admin_login')
          }
        })
  }
  return (
    <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="w-64 bg-black text-white flex flex-col">
    <Link to="/dashboard" className="p-4 text-lg font-bold">
      Code With Gaurav
    </Link>
    <ul className="space-y-4 p-4">
      <li className="hover:bg-slate-500 p-3 rounded-md">
        <Link to="/dashboard" className="flex items-center gap-2">
          <FaTachometerAlt className="h-5 w-7" />
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="hover:bg-slate-500 p-3 rounded-md">
        <Link to="/dashboard/employee" className="flex items-center gap-2">
          <BsPeople className="h-5 w-7" />
          <span>Manage Employees</span>
        </Link>
      </li>
      <li className="hover:bg-slate-500 p-3 rounded-md">
        <Link to="/dashboard/category" className="flex items-center gap-2">
          <FiLayout className="h-5 w-7" />
          <span>Category</span>
        </Link>
      </li>
      <li className="hover:bg-slate-500 p-3 rounded-md">
        <Link to="/dashboard/profile" className="flex items-center gap-2">
          <RiContactsFill className="h-5 w-7" />
          <span>Profile</span>
        </Link>
      </li>
      <li className="hover:bg-slate-500 p-3 rounded-md">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left"
        >
          <FaPowerOff className="h-5 w-7" />
          <span>Log Out</span>
        </button>
      </li>
    </ul>
  </div>

  {/* Main Content */}
  <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
    <div className="shadow-lg p-4">
      <h4 className="text-center text-2xl">Employee Management System</h4>
    </div>
    <div className="p-4">
      <Outlet />
    </div>
  </div>
</div>

  );
}

export default Dashboard;
