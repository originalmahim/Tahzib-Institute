export default function IconBtn({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center justify-center outline-none ${outline ? "border border-black bg-transparent" : "bg-green-500"
                } gap-x-2 rounded-md py-2 px-5 font-semibold primary-text hover:bg-black hover:text-green-500 duration-300 ${customClasses}
                ${disabled && 'cursor-not-allowed hover:bg-green-500 hover:primay-text'} `}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-green-500"}`}>{text}</span>
                        {children}
                    </>
                ) :
                    (text)
            }
        </button>
    )
}