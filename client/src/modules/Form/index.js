import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';

function Form({
    isSignInPage = false,
}) {

    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: '',
        }),
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    

    useEffect(() => {
        if (localStorage.getItem('user:token') !== null) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('data :>>', data);

        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/${isSignInPage ? 'login' : 'register'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });


        if (res.status === 400) {
            alert('Invalid credentials.');
        } else {
            const resData = await res.json();
            if (resData.token) {
                localStorage.setItem('user:token', resData.token);
                localStorage.setItem('user:detail', JSON.stringify(resData.user));
                navigate('/');
            }
        }
    };

    return (
        <div className="bg-[#cfe6fb] h-screen flex justify-center items-center">
            <div className='bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
                <div className='text-4xl font-extrabold'>Welcome {isSignInPage && 'Back'}</div>
                <div className='text-xl font-light mb-14'>{isSignInPage ? 'Sign in to get explored' : 'Sign up to get started'}</div>
                <form className='w-1/2' onSubmit={(e) => handleSubmit(e)}>
                    {!isSignInPage && <Input label='Full name' name='name' placeholder='Enter your full name' classNames='mb-6' value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />}
                    <Input label='Email address' name='email' type='email' placeholder='Enter your email' classNames='mb-6' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <Input label='Password' name='password' type='password' placeholder='Enter your password' classNames='mb-14' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <Button label={isSignInPage ? 'Sign in' : 'Sign up'} type='submit' classNames='w-1/2 mb-2' />
                </form>
                <div>{isSignInPage ? "Didn't have an account?" : "Already have an account?"} <span className='text-primary cursor-pointer underline' onClick={() => navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)}>{isSignInPage ? 'Sign up' : 'Sign in'}</span></div>
            </div>
        </div>
    )
}

export default Form