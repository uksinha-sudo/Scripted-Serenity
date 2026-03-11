import { motion } from "motion/react"

export const Button = ({ lable, onClick, styles }) => {
    return (
        <>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95}} onHoverStart={() => console.log('hover started!')} className={`bg-black text-white cursor-pointer p-3 ${styles}`} onClick={onClick}>{lable}</motion.button>
        </>
    )
}