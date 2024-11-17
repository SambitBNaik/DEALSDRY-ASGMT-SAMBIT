import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const CreateUser= async(req, res)=>{
    const {username,name,EmpId,email,password}=req.body;

    try {
        const userExists = await User.findOne({
            $or: [{ EmpId }, { username }, { email }]  
        });

        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }

        const user= await User.create({
            username,
            name,
            EmpId,
            email,
            password,
        });

        res.status(201).json({
            Id:user.EmpId,
            Username:user.username,
            Name:user.name,
            email:user.email,
            role:user.role
        });
    } catch (error) {
        console.error("Error in CreateUser controller",error.message);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username});

        if (user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken }= generateTokens(user._id);
            setCookies(res, accessToken , refreshToken);

            res.json({
                Username: user.username,
                EmpId: user.EmpId,
                Email: user.email,
                Role: user.role
            });
        } else {
            res.status(400).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error in Login controller", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


const setCookies= (res, accessToken,refreshToken)=>{
    res.cookie("accessToken-DA",accessToken,{
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:"strict",
        maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken-DA", refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m", 
    });

    const refreshToken= jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "7d",
    })

    return {accessToken, refreshToken};
}



export const logout= async(req, res)=>{
    try {
        res.clearCookie("accessToken-DA");
        res.clearCookie("refreshToken-DA");
        res.json({message:"Logged out successfully"});
    } catch (error) {
        console.error("Error in logout controller",error.message);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies["refreshToken-DA"];
       
        if (!refreshToken || refreshToken === "") {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        res.cookie("accessToken-DA", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.json({ message: "Token refreshed successfully" });
    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Refresh token expired" });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;  

        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            username: user.username,
            name: user.name,
            EmpId: user.EmpId,
            email: user.email, 
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
