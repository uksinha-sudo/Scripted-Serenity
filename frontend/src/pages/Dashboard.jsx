import { NavBar } from "../components/Navbar"

export const Dashboard = () => {
    return (
        <>
            <div className="h-screen w-screen bg-black/70">
                <div>
                    <NavBar />
                </div>
                <div className="w-[50vw] max-md:w-[50vw] bg-amber-50 border rounded-2xl max-h-[93vh] m-auto">

                </div>
            </div>

        </>
    )
}