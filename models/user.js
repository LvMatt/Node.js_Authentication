const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'true'
    },
    fullname: {
        type: String,
      
    },
    password: {
        type: String,
    },
    dateOfBirth: {
        type: Number,
    }
})

userSchema.pre('save', async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema )

module.exports = User