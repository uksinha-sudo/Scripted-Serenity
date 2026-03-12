
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button"
import { NavBar } from "../components/Navbar"
import axios from 'axios'
import { BACKEND_URL } from "../config.js"
import { motion } from "motion/react";
export const Dashboard = () => {

    const [notes, setNotes] = useState([]);

    const noteRef = useRef();

    const addNote = async () => {
        const note = noteRef.current.value;

        try {

            const response = await axios.post(`${BACKEND_URL}/note/add`, {
                note
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            alert(response.data.message);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                console.log(error)
                alert("Something went wrong")
            }
        }

    }

    useEffect(() => {
        async function getNotes() {
            try{

                const response = await axios.get(`${BACKEND_URL}/note/notes`, {
                    headers:{
                        Authorization: localStorage.getItem("token")
                    }
                })
                
                setNotes(response.data.note)
            } catch(error) {
                console.log(error)
            }
        }
        getNotes();
    }, [notes]);


    return (
        <>
            <div className="h-screen w-screen bg-black/70">
                <div>
                    <NavBar />
                </div>

                {/* It Should be added as a sidebar component, but in learning purpose we are adding it here */}

                <div className="absolute border h-[90vh] w-[20vw] ml-5 mt-2 flex flex-col items-center overflow-scroll no-scrollbar bg-slate-400 rounded-2xl max-md:hidden">
                    <p className="font-bold text-3xl mt-4">All Notes</p>
                    <div className="mt-5 ">

                        {notes.map((note) => (<motion.div key={note._id} whileHover={{ scale: 1.1 }} className="border min-h-[10vh] max-h-[10vh] min-w-[18vw] relative m-5 mt-3 overflow-hidden cursor-pointer">
                            <p className="p-2">{note.note}</p>
                        </motion.div>
                        ))}                

                    </div>

                </div>


                <div className="w-[50vw] flex-col bg-amber-50 border rounded-2xl m-auto items-center flex justify-center max-md:w-[80vw]" >
                    <div className="flex mt-3 p-4 max-md:w-[80vw]">
                        <textarea ref={noteRef} name="note" id="note" className={`min-w-[45vw] max-md:w-[80vw] p-4 bg-gray-300 outline-none no-scrollbar`}></textarea>
                    </div>
                    <div className="">
                        <Button onClick={addNote} lable={"Add"} styles={'px-6 rounded bg-green-400 m-2'} />
                    </div>
                </div>

            </div>

        </>
    )
}