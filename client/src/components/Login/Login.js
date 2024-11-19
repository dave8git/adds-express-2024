import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRequest } from '../../redux/postsReducer';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserRequest(formData));
        setFormData({ login: '', password: ''}); // Clear form
        navigate('/');
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <p>Login form goes here.</p>
            <form onSubmit={handleSubmit} autocomplete="off">
                <input
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={formData.login}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;