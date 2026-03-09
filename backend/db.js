import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    profilePicture: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const noteSchema = mongoose.Schema({
    note: {type: String, required: true},
    tag: {type: String},
    noteId: {type: mongoose.Types.ObjectId, require: true, ref: 'User'}
});


export const userModel = mongoose.model("User", userSchema);
export const noteModel = mongoose.model("Note", noteSchema);