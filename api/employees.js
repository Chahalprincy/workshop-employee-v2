import express from "express";
const router = express.Router();
import employees from "#db/employees";

import { base,getEmployees,getEmployeesById,getEmployeeByRandom} from "#db/employees";

router
    .route("/")
    .get((req,res) => {
        const message = base(); 
        res.status(200).send(message);
    })

router
    .route("/employees")
    .get((req,res) => {
        const employees = getEmployees();
        res.status(200).send(employees);
    })
    .post((req,res) => {
        if(!req.body) return res.status(400).send("Request must have a body.");

        const { name } = req.body;
        if (!name) return res.status(400).send("Request must include a name");

        const newEmployee = {
        id: employees.length + 1, 
        name,
        };

        employees.push(newEmployee);

        res.status(201).send(newEmployee);

    });

router
    .route("/employees/random")
    .get((req,res) => {
        const employee = getEmployeeByRandom();

        if (!employee) return res.status(404).send("Employee not found.");

        res.status(200).send(employee);
    });

router
    .route("/employees/:id")
    .get((req,res) => {
        const {id} = req.params;
        const employee = getEmployeesById(+id);

        if (!employee) return res.status(404).send("employee not found.");


        res.status(200).send(employee);
    });

    export default router;