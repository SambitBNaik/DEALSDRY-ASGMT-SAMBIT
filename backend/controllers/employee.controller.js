import cloudinary from "../lib/cloudinary.js";
import Employee from "../models/employee.model.js";

export const getAllEmployee = async(req,res)=>{
    try {
        const employees = await Employee.find({});
        res.status(201).json({employees});
    } catch (error) {
        console.error("Error in getAllEmployee controller", error.message);
        res.status(500).json({message:"Server Error", error:error.message});
    }
}

export const createEmployee = async (req, res) => {
    try {
        const { name, designation, email, phone, gender, course, image } = req.body;

        const createdBy = req.user?._id; 
       
        if (!createdBy) {
            return res.status(400).json({ message: "User ID (createdBy) is required" });
        }

      
        if (!name || !designation || !email || !phone) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

      
        const existingEmployee = await Employee.findOne({
            $or: [{ email }, { phone }],
        });

        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email or phone already exists" });
        }

        
        let cloudinaryResponse = null;

        try {
            if (image) {
                cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "employees" });
            }
        } catch (uploadError) {
            console.error("Error uploading image to Cloudinary", uploadError.message);
            return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
        }

       
        const employee = await Employee.create({
            name,
            designation,
            email,
            phone,
            gender,
            course,
            image: cloudinaryResponse?.secure_url || "", 
            createdBy,
        });

        res.status(201).json(employee);
    } catch (error) {
        console.error("Error in createEmployee controller", error.message, error.stack);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteEmployee = async(req, res)=>{
    try {
        const employee = await Employee.findById(req.params.id);

        if(!employee){
            return res.status(404).json({message:" Employee details not found"});
        }

        if(employee.image){
            const publicId = employee.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`employees/${publicId}`);
                console.log("deleted image from cloduinary");
            } catch (error) {
                console.error("Error deleting image from cloudinary", error);
            }
        }

        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({message :"Employee details deleted successfully"});
    } catch (error) {
        console.error("Error in deleteEmployee controller",error.message);
        res.status(500).json({message:"Server error", error:error.message});
    }
}

export const updateEmployee = async(req, res)=>{
    try {
        const {id}= req.params;
        const {name, designation, email, phone, gender, course, image}= req.body;

        const employee= await Employee.findById(id);

        if(!employee){
            return res.status(404).json({message:"Employee not found"});
        }

        let cloudinaryResponse= null;

        if(image && image!== employee.image){
            if(employee.image){
                const publicId=employee.image.split("/").pop().split(".")[0];
                await cloudinaryResponse.uploader.destroy(`employees/${publicId}`);
            }

            cloudinaryResponse= await cloudinary.uploader.upload(image, {folder : "employees"});
        }

        employee.name = name || employee.name;
        employee.designation = designation || employee.designation;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.gender = gender || employee.gender;
        employee.course = course || employee.course;
        employee.image = cloudinaryResponse?.secure_url || employee.image;

        await employee.save();
        res.status(200).json({message:"Employee updated successfully",employee});
    } catch (error) {
        console.error("Error in updateEmployee controller", error.message);
        res.status(500).json({message:"Server Error",error:error.message});
    }
}
