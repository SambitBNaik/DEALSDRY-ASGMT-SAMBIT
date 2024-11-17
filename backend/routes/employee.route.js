import express from 'express';
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '../controllers/employee.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.get("/",protectRoute,getAllEmployee);
router.post("/create-employee",protectRoute,createEmployee);
router.patch("/:id",protectRoute,updateEmployee);
router.delete("/delete-employee/:id",protectRoute,deleteEmployee);

export default router;