import React, { useState } from 'react';
import { motion } from 'framer-motion';
import{ Lock, User } from 'lucide-react';



const LoginPage = () => {
    const [formData,setFormData]= useState({
        username:"",
        password:"",
    });

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    }
  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <motion.div
            className='sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity : 0, y: -20}}
            animate={{ opacity : 1, y: 0}}
            transition={{duration: 0.8}}
        >
            <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Login your account</h2>
        </motion.div>

        <motion.div
           className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
           initial={{ opacity : 0, y : 20}}
           animate={{ opacity : 1, y : 0}}
           transition={{ duration: 0.8, delay: 0.2}}
        >
            <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                  <form className='space-y-6' onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor='username' className='block text-sm font-medium text-gray-300'>
                            Username
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                             <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                  <User className='h-5 w-5 text-gray-400 ' aria-hidden='true'/>
                             </div>
                             <input
                                id='username'
                                type='username'
                                required
                                value={formData.username}
                                onChange={(e)=>setFormData({...formData,username:e.target.value})}
                                className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
                                rounded-md shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500 sm:text-sm'
                                placeholder='john_doe' 
                             />
                        </div>
                     </div>
                     <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                            Password
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock  className='h-5 w-5 text-gray-400' aria-hidden='true'/>
                            </div>
                            <input
                               id='password'
                               type='password'
                               required
                               value={formData.password}
                               onChange={(e)=>setFormData({...formData,password:e.target.value})}
                               className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
                               rounded-md shadow-sm
                               placeholder-gray-400 focus:outline-none focus:ring-emerald-500
                               focus:border-emerald-500 sm:text-sm'
                               placeholder='••••••••'
                             />
                        </div>
                     </div>
                     <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent
                        rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                        hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                     >
                        Login
                     </button>
                  </form>
            </div>
        </motion.div>
    </div>
  )
}

export default LoginPage