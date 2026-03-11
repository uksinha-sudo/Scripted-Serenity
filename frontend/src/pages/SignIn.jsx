
import { useRef } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios'
import { BACKEND_URL } from "../config.js"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function signin() {

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {

            const response = await axios.post(`${BACKEND_URL}/user/signin`, {
                email, password
            });

            localStorage.setItem("token", response.data.token);
            alert(response.data.message);

            navigate("/dashboard");

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
            <div className="flex flex-col items-center bg-white max-h-[90vh] rounded-2xl p-5 max-w-[90vw] gap-3">
                <div className="flex items-center flex-col gap-5">
                    <Heading lable={"Sign In"} />
                    <SubHeading lable={"Enter your Credentials to access your account"} />
                </div>
                <div className="flex flex-col gap-5 mt-3">
                    <InputBox reference={emailRef} placeholder={"johndoe@example.com"} lable={"Email"} styles={"w-80"} type={"email"} />
                    <InputBox reference={passwordRef} lable={"password"} styles={"w-80"} type={"password"} />
                </div>
                <div>
                    <Button lable={"Submit"} styles={"mt-3 rounded-2xl px-6"} onClick={signin} />
                </div>

            </div>
        </div>
    )
}