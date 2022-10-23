const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        primaryKey: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Please enter a valid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        maxLength: 50,
    }
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, passwordHash) => {
            if (err) {
                return next(err);
            }
            this.password = passwordHash;
            next();
        });
    }
})

UserSchema.methods.validatePassword = async function(password){
    try{
        const correctPassword = await bcrypt.compare(password, this.password);
        return correctPassword;
    } catch(err){
        throw new Error(err);
    }
}

module.exports = mongoose.model("User", UserSchema)