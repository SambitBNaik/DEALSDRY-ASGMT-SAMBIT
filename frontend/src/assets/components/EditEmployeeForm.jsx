import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Smartphone, SquareUser, Upload } from 'lucide-react';

const designations = ["HR", "Manager", "Sales"];
const courses = ["BCA", "MCA", "BSC"];

const EditEmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        designation: "",
        gender: "",
        course: "",
        image: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Edit Employee Details</h2>

            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                        Name
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <SquareUser className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                            type='name'
                            id='name'
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className='mt-1 block w-full bg-gray-700 pl-10 px-3 py-2 border-gray-600 rounded-md shadow-sm 
                             text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            required
                            placeholder='Enter the name'
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                        Email
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                            <Mail className='h-5 w-5 text-gray-400 ' aria-hidden='true' />
                        </div>
                        <input
                            type='email'
                            id='email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className='mt-1 block w-full bg-gray-700 pl-10 px-3 py-2 border-gray-600 rounded-md shadow-sm
                           text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                        Phone Number
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                            <Smartphone className='h-5 w-5 text-gray-400 ' aria-hidden='true' />
                        </div>
                        <input
                            type='phone'
                            id='phone'
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className='mt-1 block w-full bg-gray-700 pl-10 px-3 py-2 border-gray-600 rounded-md shadow-sm
                           text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            required
                            placeholder='Enter Phone Number'
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-300">
                        Designation
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <select
                            id="designation"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            className="mt-1 block w-full bg-gray-700 px-3 py-2 border-gray-600 rounded-md shadow-sm
                          text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        >
                            <option value="" disabled>
                                Select your designation
                            </option>
                            {designations.map((designation, index) => (
                                <option key={index} value={designation}>
                                    {designation}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Gender</label>
                    <div className="mt-1 flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                id="male"
                                name="gender"
                                type="radio"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:border-emerald-500 checked:bg-emerald-500 checked:border-4"
                            />
                            <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-300">
                                Male
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="female"
                                name="gender"
                                type="radio"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:border-emerald-500 checked:bg-emerald-500 checked:border-4"
                            />
                            <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-300">
                                Female
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-300">
                        Course
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <select
                            id="course"
                            value={formData.course}
                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                            className="mt-1 block w-full bg-gray-700 px-3 py-2 border-gray-600 rounded-md shadow-sm
                          text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        >
                            <option value=""  disabled>
                                Select your course
                            </option>
                            {courses.map((course, index) => (
                                <option key={index} value={course} >
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mt-1 flex items-center'>
                    <input type='file' id='image' className='sr-only' accept='image/*' />
                    <label
                        htmlFor='image'
                        className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm
                       text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-emerald-500'
                    >
                        <Upload className='h-5 w-5 inline-block mr-2' />
                        Upload Image
                    </label>
                    {formData.image && <span className='ml-3 text-sm text-gray-400'>Image Uploaded</span>}
                </div>
                <button
                    type='submit'
                    className='w-full flex justify-center py-2 border border-transparent rounded-md
                    shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
                >
                    Update
                </button>
            </form>
        </motion.div>
    )
}

export default EditEmployeeForm