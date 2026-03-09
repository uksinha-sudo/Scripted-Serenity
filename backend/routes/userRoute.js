import { Router } from 'express'
import { userModel } from '../db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
import { middleware } from '../auth.js';
const jwt_secret = process.env.JWT_SECRET;

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, profilePicture, email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({
            email
        });

        if (existingUser) {
            return res.status(403).send({
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            firstName,
            lastName,
            profilePicture,
            email,
            password: hashedPassword
        });

        res.send({
            message: "Account Created"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server error, Failed to create account"
        })
    }

});

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {


        const existingUser = await userModel.findOne({
            email
        })
        if (!existingUser) {
            return res.status(403).send({
                message: "User does not exist"
            })
        }

        const decryptPassword = await bcrypt.compare(password, existingUser.password);

        if (!decryptPassword) {
            res.status(401).send({
                message: "Invalid Credentials"
            })
        } else {
            const token = jwt.sign({
                id: existingUser._id
            }, jwt_secret);

            res.send({
                message: "User logged in",
                token
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error, Failed to login"
        })
    }
});

userRouter.get("/users", middleware, async (req, res) => {
    const userId = req.body;
    try {

        const response = await userModel.find({
            userId
        });

        if (!response) {
            return res.status(403).send({
                message: "User not found"
            })
        }

        res.send({
            response
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error, failed to get user information"
        })
    }
});

userRouter.delete("/delete", middleware, async (req, res) => {
    const userId = req.body;

    try {

        const response = await userModel.findOneAndDelete({
            userId
        });

        if (!response) {
            return res.status(403).send({
                message: "User not found"
            })
        }

        res.send({
            message: "User deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error, failed to Delete Your account"
        })
    }


})

userRouter.put("/updateInfo", middleware, async (req, res) => {
    const {userId} = req.body;

    const { firstName, lastName, profilePicture } = req.body;

    try {


        const updatedInfo = await userModel.findOneAndUpdate(
            { userId }, //filter
            { firstName, lastName, profilePicture }, // update
            { returnDocument: 'after' }, //return method
        )

        if (!updatedInfo) {
            return res.status(404).send({
                message: "User not found"
            })
        }

        res.status(200).send({ message: "User information Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ messsage: "Internal server error, failed to updated user information" });
    }


})