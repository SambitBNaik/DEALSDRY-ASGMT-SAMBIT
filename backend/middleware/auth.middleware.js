import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies["accessToken-DA"];

        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized - No access token provided" });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
           
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user=user;

            next();

        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - Access token expired" });
            }
            console.log("Error verifying token", error.message);
            return res.status(401).json({ message: "Unauthorized - Invalid access token" });
        }
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
}

