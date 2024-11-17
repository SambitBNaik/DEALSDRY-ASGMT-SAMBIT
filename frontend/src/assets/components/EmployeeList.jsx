import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useEmployeeStore } from '../../stores/useEmployeeStore.js';
import { Pencil, Trash } from 'lucide-react';
import EditEmployeeForm from './EditEmployeeForm.jsx';

const EmployeeList = () => {
    const { employees,updateEmployee, deleteEmployee } = useEmployeeStore();
    const [searchItem, setSearchItem] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchItem.toLowerCase()) ||
        employee.EmpId.toLowerCase().includes(searchItem.toLowerCase())
    );

    const isOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(false);
    }

    const handleDelete= async(employeeId)=>{
        const confirmDelete= window.confirm("Are you want to delete Employee information");
        if(confirmDelete){
            await deleteEmployee(employeeId);
        }
    }
    return (
        <>
            <motion.div
                className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-8xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >

                <div className="p-4 flex justify-end">
                    <input
                        type="text"
                        placeholder="Search by Name, Email, or ID..."
                        className="w-full max-w-xs min-w-[200px] px-4 py-2 rounded-md bg-gray-700 text-gray-300 
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>

                <table className=' min-w-full divide-y divide-gray-700'>
                    <thead className='bg-gray-700'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Unique ID
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Image
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Name
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Email
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Mobile No
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Designation
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Gender
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Course
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Created Date
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-800 divide-y divide-gray-700'>
                        {
                            filteredEmployees.map((employee) => (
                                <tr key={employee._id} className='hover:bg-gray-700'>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.EmpId}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 h-12 w-12'>
                                                <img
                                                    className='h-12 w-12 rounded-full object-cover'
                                                    src={employee.image}
                                                    alt={employee.name}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.name}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.email}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.phone}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.designation}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.gender}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div>{employee.course}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            {new Date(employee.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex justify-center items-center gap-4">
                                            <button
                                                className="text-blue-400 hover:text-blue-500"
                                                onClick={() => isOpenModal(employee)}
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </button>
                                            <button className="text-red-400 hover:text-red-300"
                                            onClick={()=>handleDelete(employee._id)}>
                                                <Trash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </motion.div>


            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className="w-3/4 md:w-1/2 bg-transparent rounded-lg p-6">
                        <EditEmployeeForm employee={selectedEmployee} onClose={closeModal} updateEmployee={updateEmployee} />
                    </div>
                </div>
            )}

        </>
    );
};

export default EmployeeList