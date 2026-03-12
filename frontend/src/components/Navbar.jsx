import { Logo } from "./Logo"
import { SignOut } from "./SignOut"

export const NavBar = () => {
    return (
        <>
            <div className="w-screen bg-slate-400 h-16 flex items-center justify-center">
                <div className="w-[50vw] max-md:w-[80vw] flex justify-between items-center">
                    <div>
                        <Logo />
                    </div>
                    <div>
                        <SignOut />
                    </div>
                </div>
            </div>
        
        </>
    )
}