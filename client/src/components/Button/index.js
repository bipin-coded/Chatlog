import React from 'react'

function Button({
    label = 'Button',
    type = 'button',
    classNames = '',
    disabled = false,
}) {
    return (
        <button type={type} className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full ${classNames}`} disabled={disabled}>{label}</button>
    )
}

export default Button