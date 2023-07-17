import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
    /*  password: {
         type: String,
         required: [true, 'Password is required']
     },
     isVerified: {
         type: Boolean,
         default: false
     },
     isAdmin: {
         type: Boolean,
         default: false
     },
     forgotPasswordToken: String,
     forgotPasswordTokenExpiry: Date,
     verifyToken: String,
     verifyTokenExpiry: Date,
  */
});

// Hash the password before saving to the database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to validate password
/* UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

 */
const User = models.User || model("User", UserSchema);

export default User;