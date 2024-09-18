export default function IconBtn({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center justify-center outline-none ${outline ? "border border-black bg-yellow-400 text-black" : "bg-yellow-500"
                } gap-x-2 rounded-md py-2 px-5 font-semibold text-black hover:bg-yellow-400 hover:text-black duration-300 ${customClasses}
                ${disabled && 'cursor-not-allowed hover:bg-yellow-500 hover:text-black'} `}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-black"}`}>{text}</span>
                        {children}
                    </>
                ) :
                    (text)
            }
        </button>
    )
}