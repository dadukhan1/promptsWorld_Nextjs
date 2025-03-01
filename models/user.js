import { unique } from "@node_modules/next/dist/build/utils";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email required!'],
    },
    username: {
        type: String,
        unique: [true, 'Email is required!'],
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'],
    },
    image: {
        type: String,
    },
});

const User = models.User || model("User", userSchema);


export default User;

