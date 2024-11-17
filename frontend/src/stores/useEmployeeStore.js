import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const useEmployeeStore=create((set)=>({
    employees :[],
    loading: false,

    setEmployees:(employees)=>set({employees}),
    createEmployees : async(employeeData)=>{
        set({loading : false});

        try{
            const res= await axios.post("/employee/create-employee",employeeData);
            set((prevState)=>({
                employees:[...prevState.employees,res.data],
                loading: false,
            }));
            toast.success("Employee details created successfully");
        }catch(error){
            toast.error(error.response.data.error);
            set({loading:false});
        }
    },
    fetchAllEmployees: async()=>{
        set({loading: true});
        try {
            const response= await axios.get("/employee");
            set({employees: response?.data?.employees, loading:false});
        } catch (error) {
            set({error:"Faled to fetch employess",loading:false});
            toast.error(error.response.data.error || "Failed to fetch employees");
        }
    },
    updateEmployee: async (id, updatedData) => {
        set({ loading: true });

        try {
            const response = await axios.patch(`/employee/${id}`, updatedData);
            set((prevState) => ({
                employees: prevState.employees.map((emp) =>
                    emp._id === id ? response.data.employee : emp
                ),
                loading: false,
            }));
            toast.success("Employee details updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update employee");
            set({ loading: false });
        }
    },
    deleteEmployee: async(employeeId)=>{
        set({loading: true});
        try{
            await axios.delete(`/employee/delete-employee/${employeeId}`);
            set((prevState)=>({
                employees:prevState.employees.filter((employee)=>employee._id!== employeeId),
                loading:false,
            }));
        }catch(error){
            set({loading: false});
            toast.error(error.response.data.error || "Failed to delete employee");
        }
    }
}))