

export const InputBox = ({ type, placeholder, styles, reference, lable }) => {
    return (
        <>  
        <div className="flex flex-col gap-2">

            <p>{lable}</p>
            <input ref={reference} type={type} placeholder={placeholder} className={`bg-gray-200 rounded p-2 w-60 outline-black ${styles}`} />
        </div>
        </>
    )
}