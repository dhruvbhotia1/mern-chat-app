import React, {useContext, useState} from 'react';
import {UserContext} from '../context/user.context.jsx';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import axios from '../config/axios.js';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext);

    const navigate  = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        axios.post('/users/login', {
            email,
            password
        }).then((res)=> {
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        }).catch((err) => {
            console.log(err.res.data);
        })

    }


    return (
        <div className={'min-h-screen flex items-center justify-center bg-gray-900'}>
            <div className={'bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'}>
                <h2 className={'text-2xl font-bold text-white mb-6'}>Login</h2>

                <form onSubmit={submitHandler}>
                    <div className={'mb-4'}>
                        <label className={'block text-gray-400 mb-2'} htmlFor={"email"}>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type={'email'}
                            id={'email'}
                            className={'w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'}
                        />
                    </div>

                    <div className={'mb-6'}>
                        <label className={'block text-gray-400 mb-2'} htmlFor={"password"}>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={'password'}
                            id={'password'}
                            className={'w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'}
                        />
                    </div>

                    <button type={'submit'} className={'w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'}>
                        Login

                    </button>

                </form>

                <p className={'text-gray-400 mt04'}>
                    Don't have an account? <Link to={'/register'} className={'text-blue-500 hover:underline'}>Create One</Link>
                </p>
            </div>

        </div>
    );
};

export default Login;