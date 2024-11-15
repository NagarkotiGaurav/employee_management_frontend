
import './App.css'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/login'
import Employee  from './components/Employee'
import {BrowserRouter , Routes , Route, useNavigate} from 'react-router-dom'
import Category from './components/Category'
import Profile from './components/Profile'
import AddCategory from './components/AddCategory'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import Start from './components/Start'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeeDetail from './components/EmployeeDetail'
import { useEffect } from 'react'
import axios from 'axios'
import PrivateRoute from './components/PrivateRoute'

function App() {
  
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start/>}></Route>
      <Route path='/admin_login' element={<Login/>}></Route>
      <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
      <Route path='/dashboard' element={<PrivateRoute>
        <Dashboard/>
        </PrivateRoute>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='employee' element={<Employee/>}></Route>
      <Route path='category' element={<Category/>}></Route>
      <Route path='profile' element={<Profile/>}></Route>
      <Route path='add_category' element={<AddCategory/>}></Route>
      <Route path='add_employee' element={<AddEmployee/>}></Route>
      <Route path='edit_employee/:id' element={<EditEmployee/>}></Route>
      </Route>
      <Route path='employee_detail/:id' element={<PrivateRoute>
        <EmployeeDetail/>
      </PrivateRoute>
        }></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
