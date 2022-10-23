const express = require("express")
const mongoose = require("mongoose")
const routes = express.Router()
const EmployeeModel = require("../models/Employee.js")



routes.get("/employees", async (req, res) => {
    try{
        const employees = await EmployeeModel.find()
        res.status(200).send(employees)
    } catch (err) {
        res.status(400).send({ status: false, message: err })
    }  
})


routes.post("/employees", async (req, res) => {
    try{
        if(!req.body.first_name) {
            res.status(400).send({ status: false, error: "Employee name is required" })
        } else if(!req.body.last_name) {
            res.status(400).send({ status: false, error: "Employee last name is required" })
        } else if(!req.body.email) {
            res.status(400).send({ status: false, error: "Employee email is required" })
        } else if (!req.body.salary) {
            res.status(400).send({ status: false, error: "Employee salary is required" })
        } else {
            const employee = new EmployeeModel(req.body)
            const existingEmail = await EmployeeModel.findOne({ email: req.body.email })
            if(existingEmail) {
                res.status(400).send({ status: false, email: employee.email, message: "Email already exists" })
            } else {
                await employee.save()
                res.status(201).send({ status: true, email: employee.email, message: "Employee added successfully"})
            }
        }
    } catch (err) {
        res.status(400).send({ status: false, message: err })
    }  
})


routes.get("/employees/:eid", async (req, res) => {
    try{
        if(!req.params.eid) {
            res.status(400).send({ status: false, message: "Employee ID is required" })
        } else {
            const employee = await EmployeeModel.findById(req.params.eid)
            if(!employee) {
                res.status(404).send({ status: false,  message: "Employee not found" })
            } else {
                res.status(200).send(employee)
            }
        }
    } catch (err) {
        res.status(400).send({ status: false, message: err })
    }  
})


routes.put("/employees/:eid", async (req, res) => {
    try{
        if(!req.params.eid) {
            res.status(400).send({ status: false, message: "Employee ID is required" })
        } else {
            if(!req.body.first_name) {
                res.status(400).send({ status: false, error: "Employee name is required" })
            } else if(!req.body.last_name) {
                res.status(400).send({ status: false, error: "Employee last name is required" })
            } else if(!req.body.email) {
                res.status(400).send({ status: false, error: "Employee email is required" })
            } else if (!req.body.salary) {
                res.status(400).send({ status: false, error: "Employee salary is required" })
            } else {
                const employee = await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body)
                if(!employee) {
                    res.status(404).send({ status: false, message: "Employee not found" })
                } else {
                    res.status(200).send({ status: true, message: "Employee updated successfully"})
                }
            }
        }
    } catch (err) {
        res.status(400).send({ status: false, message: err })
    }
})


routes.delete("/employees", async (req, res) => {
    try{
        if(!req.query.eid) {
            res.status(400).send({ status: false, message: "Employee ID is required" })
        } else {
            const employee = await EmployeeModel.findByIdAndDelete(req.query.eid)
            if(employee) {
                res.status(200).send({ status: true, email: employee.email, message: "Employee deleted successfully"})
            } else {
                res.status(400).send({ status: false, message: "Employee not found" })
            }
        }
    } catch (err) {
        res.status(400).send({ status: false, message: err })
    }
})

module.exports = routes
