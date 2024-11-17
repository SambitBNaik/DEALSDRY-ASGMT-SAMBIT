import mongoose from "mongoose";

const employeeSchema= new mongoose.Schema({
    EmpId:{
        type:String,
        unique:true,
        required:true,
        default:function(){
            return `CST${Math.floor(Math.random()*1000)+101}`;
        },
    },
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        match:/^[0-9]{10}$/,
    },
    designation:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required: true,
    },
    course:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;