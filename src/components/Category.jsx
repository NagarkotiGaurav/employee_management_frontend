import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Category() {
  const [category,setCategory] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3306/auth/category/')
    .then(result=>{
      if(result.data.Status){
        setCategory(result.data.Result)
        console.log("success")
      }
      else {
        console.log(result.data)
        alert(result.data.Error)
      }
    })
  .catch((err)=>console.log(err))
  },[])
  return (
  
    <div className='px-5 mt-3 '>
      <div className='flex justify-center'>
        <h3 className='text-2xl  font-semibold'>Category list</h3>
      </div>
      <Link to={'/dashboard/add_category'} className='p-1 rounded-md self-center font-medium text-white bg-green-600'>Add Category</Link>
      <div className='mt-3  '>
        <table className=' border-collapse w-full border-slate-500 border-b-[1.5px] rounded-md'>
          <thead>
            <tr>
              <th className=' border-slate-500 border-b-[1.5px] rounded-md'>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c)=>(
              <tr>
                <td key={c.id} className=' border-slate-500 border-b-[1.5px] px-3 rounded-md'>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
     )
}

export default Category