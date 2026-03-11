import { useNavigate } from "react-router-dom";
import { Button } from "./Button"


export const SignOut = () => {

    const navigate = useNavigate();

    function signout(){
        try{

            if(localStorage.getItem("token") === null){
                return alert("No token found")
            }
        
            localStorage.removeItem("token");
            navigate('/signin')
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Button lable={"Sign Out"} styles={"rounded-2xl px-5"} onClick={signout}/>
        </>
    )
}