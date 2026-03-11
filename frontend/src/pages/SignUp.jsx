import { useRef } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios'
import { BACKEND_URL } from "../config.js"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {

    const navigate = useNavigate();


    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function signup() {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {

            const response = await axios.post(`${BACKEND_URL}/user/signup`, {
                firstName, lastName, email, password
            });

            alert(response.data.message);
            navigate("/signin");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Something went wrong")
            }
        }

    }

    return (
        <div className="flex bg-black/50 w-screen h-screen items-center justify-center">
            <div className="flex flex-col items-center bg-white max-h-[90vh] rounded-2xl p-4 max-w-[90vw] gap-3">
                <div className="flex items-center flex-col gap-5">
                    <Heading lable={"Sign Up"} />
                    <SubHeading lable={"Enter your information to create an account"} />
                </div>
                <div className="flex flex-col gap-5 mt-3">
                    <InputBox reference={firstNameRef} placeholder={"John"} lable={"First Name"} type={"text"} styles={"w-80"} />
                    <InputBox reference={lastNameRef} placeholder={"Doe"} lable={"Last Name"} styles={"w-80"} type={"text"} />
                    <InputBox reference={emailRef} placeholder={"johndoe@example.com"} lable={"Email"} styles={"w-80"} type={"email"} />
                    <InputBox reference={passwordRef} lable={"password"} styles={"w-80"} type={"password"} />
                </div>
                <div>
                    <Button lable={"Submit"} styles={"mt-3 rounded-2xl px-6"} onClick={signup} />
                </div>
                <div>
                    <p className="font-semibold">Already have an account? <a className="underline" href="signin">Sign In</a></p>
                </div>
            </div>
        </div>
    )
}