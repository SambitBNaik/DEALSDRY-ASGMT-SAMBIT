import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useEmployeeStore } from '../../stores/useEmployeeStore.js';
import { Pencil, Trash } from 'lucide-react';
import EditEmployeeForm from './EditEmployeeForm';

const EmployeeList = () => {
    const { employees } = useEmployeeStore();
    const [searchItem, setSearchItem] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchItem.toLowerCase()) ||
        employee.EmpId.toLowerCase().includes(searchItem.toLowerCase())
    );

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(false);
    };

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

                <table className='min-w-full divide-y divide-gray-700'>
                    <thead className='bg-gray-700'>
                        <tr>
                            {/* Table Headers */}
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Unique ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Image</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Mobile No</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Designation</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Gender</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Course</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Created Date</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-800 divide-y divide-gray-700'>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee._id} className='hover:bg-gray-700'>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.EmpId}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <img className='h-12 w-12 rounded-full object-cover' src={employee.image} alt={employee.name} />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.email}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.phone}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.designation}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.gender}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{employee.course}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {new Date(employee.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex justify-center items-center gap-4">
                                        <button
                                            className="text-blue-400 hover:text-blue-500"
                                            onClick={() => openModal(employee)}
                                        >
                                            <Pencil className="h-5 w-5" />
                                        </button>
                                        <button className="text-red-400 hover:text-red-300">
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <EditEmployeeForm employee={selectedEmployee} onClose={closeModal} />
                </div>
            )}
        </>
    );
};

export default EmployeeList;
