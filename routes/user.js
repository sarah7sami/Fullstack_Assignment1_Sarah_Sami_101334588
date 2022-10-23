const express = require("express")
const mongoose = require("mongoose")
const UserModel = require("../models/User.js")
const routes = express.Router()


routes.post("/signup", async (req, res) => {
    try{
        if(!req.body.username) {
            res.status(400).send({ status: false, message: "Username is required" })
        } else if(!req.body.email) {
            res.status(400).send({ status: false, message: "Email is required" })
        } else if(!req.body.password) {
            res.status(400).send({ status: false, message: "Password is required" })
        } else {
            const user = new UserModel(req.body)
            const existingUser = await UserModel.findOne({$or: [{ email: req.body.email }, { username: req.body.username }]})
            if(existingUser) {
                res.status(400).send({ status: false, message: "User already exists" })
            } else {
                await user.save()
                res.status(201).send({ status: true, message: "User added successfully"})
            }
        }
    } catch (err) {
        res.status(400).send({ status: false, message: err })
    }  
})


routes.post("/login", async (req, res) => {
    try{
        if(!req.body.password) {
            res.status(400).send({ status: false, message: "Password is required" })
        } else {
            const user = await UserModel.findOne({$or: [{ email: req.body.email }, { username: req.body.username }]})
            if(!user) {
                res.status(404).send({ status: false, message: "User not found" })
            } else {
                const correctPassword = await user.validatePassword(req.body.password)
                if(correctPassword) {
                    res.status(200).send({ status: true, user: user.username, message: "Login successful" })
                } else {
                    res.status(400).send({ status: false, message: "Invalid credentials" })
                }
            }
        }
    } catch (err) {
        res.status(400).send({ status: false, message: err})
    }  
})

module.exports = routes