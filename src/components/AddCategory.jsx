import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddCategory() {

  const [category , setCategory] = useState();
  axios.defaults.withCredentials= true;
  const navigate = useNavigate()
  const handleSubmit =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3306/auth/add_category/',{category})
        .then(result=>{
          if(result.data.Status){
            navigate('/dashboard/category')
          }
          else{
            console.log(result.body.error)
          }
        })
          .catch(err=>console.log(err))
  } 
  return (
    <div className=' h-3/4 flex justify-center    items-center '>  
        <div className='*:m-3 flex flex-col items-center border-2 rounded-md px-6 pt-3 pb-8 '>
            

            <h2 className='text-2xl '><strong>Add Category</strong></h2>

                <form  onSubmit={handleSubmit}  >
            <div className=' flex flex-col'>
                <label htmlFor="category" className='text-lg font-medium'>Category :</label>
                <input type="text" onChange={(e)=>setCategory(e.target.value)} name="category"  className='rounded-md outline-1 outline ps-2' placeholder='enter Category' />
            </div>
            
            <button type="submit"  className='bg-green-700 rounded-lg px-3 my-2'>Add Category</button>
            
            
                </form>
        </div>
    </div>
  )
}

export default AddCategory