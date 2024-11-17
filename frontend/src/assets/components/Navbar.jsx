import React from 'react'
import { Link } from 'react-router-dom';
import { Users, House , LogOut} from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

const Navbar = () => {
    const {user, logout}=useUserStore();
    console.log("User", user);
    return (
        <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
            <div className='top-0 left-0 container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='top-0 left-0 flex flex-wrap items-center gap-4'>
                        <Link to="/" className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
                            Employee Management
                        </Link>
                        {user && (<Link 
                            to="/" className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
                           transition duration-300 ease-in-out flex items-center'
                        >
                            <House className='inline-block mr-1' size={18} />
                            <span className='hidden sm:inline'>Home</span>
                        </Link>)}
                        {user && (<Link
                           to="/secret-dashboard" className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
                           transition duration-300 ease-in-out flex items-center'
                        >
                            <Users className='inline-block mr-1' size={18} />
                            <span className='hidden sm:inline'>Employee List</span>
                        </Link>)}

                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        {user && (<h3 className='text-xl font-bold text-emerald-400 items-center space-x-2 flex'>{user.Username}</h3>)}
                        {user && (<button
                            className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
                        onClick={logout}
                        >
                            <LogOut size={18} />
                            <span className='hidden sm:inline ml-2'>Log Out</span>
                        </button>)}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar