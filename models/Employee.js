const mongoose = require('mongoose')
const validator = require('validator')

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxLength: 50,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid Email']
    },
    gender: {
        type: String,
        lowercase: true,
        maxLength: 25,
        enum: ["male", "female", "other"],
    },
    salary: {
        type: Number,
        required: true,
        default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative Salary aren't real.")
    }
    },
});

module.exports = mongoose.model("Employee", EmployeeSchema)