import React,{useEffect, useState} from 'react';
import { motion } from "framer-motion";
import { SquarePlus,UsersRound} from "lucide-react";
import CreateEmployeeForm from '../assets/components/CreateEmployeeForm';
import EmployeeList from '../assets/components/EmployeeList';
import { useEmployeeStore } from '../stores/useEmployeeStore';


const tabs = [
	{ id: "create", label: "Create Employee Profile", icon: SquarePlus },
	{ id: "list", label: "EmployeeList", icon: UsersRound },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    const {fetchAllEmployees}=useEmployeeStore();
    useEffect(()=>{
        fetchAllEmployees();
    },[fetchAllEmployees]);
  return (
    <div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-emerald-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "create" && <CreateEmployeeForm/>}
				{activeTab === "list" && <EmployeeList/>}
				
			</div>
		</div>
	);
};


export default AdminPage