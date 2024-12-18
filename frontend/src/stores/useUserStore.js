import {create} from 'zustand';
import axios from "../lib/axios.js";
import {toast} from 'react-hot-toast';


export const useUserStore= create((set, get)=>({
    user:null,
    loading:false,
    checkingAuth:true,

    login: async(username, password)=>{
        set({loading : true});

        try {
            const res= await axios.post("/auth/login",{username,password});

            set({user: res.data, loading: false});
            toast.success("Loggin Successful");
        } catch (error) {
            set({loading : false});
            toast.error(error.response.data.message || "An error occured");
        }
    },

    logout: async() =>{
        try {
            await axios.post("/auth/logout");
            set({user:null});
            toast.success("Loggout successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occured during logout");
        }
    },

    checkAuth: async()=>{
        set({checkingAuth : true});
        try {
            const response= await axios.get("/auth/profile");
            set({user:response.data , checkingAuth:false});
        } catch (error) {
            console.error(error.message);
            set({checkingAuth:false, user:null});
        }
    },

    refreshToken :async()=>{
        if(get().checkingAuth) return;

        set({checkingAuth : true});

        try{
            const response = await axios.post("/auth/refresh-token");
            set({checkingAuth: false});
            return response.data;
        }catch(error){
            set({user:null , checkingAuth: false});
            throw error;
        }
    }

}));


let refreshPromise=null;

axios.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest= error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry=true;

            try {
                if(refreshPromise){
                    await refreshPromise;
                    return axios(originalRequest);
                }

                refreshPromise=useUserStore.getState().refreshToken();
                await refreshPromise;
                refreshPromise=null;
            } catch (refreshError) {
                useUserStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);