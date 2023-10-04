import React from 'react'

function    Input({
    label = '',
    name = '',
    type = 'text',
    classNames = '',
    isRequired = true,
    placeholder = '',
    value = '',
    onChange = () => {},
}) {
    return (
        <div className='w-full'>
            <label htmlFor={name} className="block text-sm font-medium text-gray-800">{label}</label>
            <input type={type} name={name} id={name} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${classNames}`} placeholder={placeholder} required={isRequired} value={value} onChange={onChange} autoComplete="off"/>
        </div>
    )
}

export default Input