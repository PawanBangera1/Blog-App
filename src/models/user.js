const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require("crypto");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: ''
    }
}, {timestamps: true});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hash = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hash;
    next();
});

const User = model('User', userSchema);

module.exports = User;