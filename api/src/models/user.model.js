const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /^[^@]+@[^@]+\.[^@]+$/ },
    password: { type: String, required: true, minLength: 8},
    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
}, {
    timestamps: true
})

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`
})

const User = mongoose.model("User", userSchema)

module.exports = User;