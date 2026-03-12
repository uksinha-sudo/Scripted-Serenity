import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    profilePicture: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export const userModel = mongoose.model("User", userSchema);
const noteSchema = mongoose.Schema({
    note: {type: String},
    tag: {type: String},
    userId: {type: Schema.Types.ObjectId, required: true, ref: "User"}
});


export const noteModel = mongoose.model("Note", noteSchema);