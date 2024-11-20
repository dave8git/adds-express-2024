import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserRequest } from '../../redux/postsReducer'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ 
        login: '', 
        password: '', 
        avatar: '', 
        phone: '' 
    });

    const message = useSelector((state) => state.posts.message);
    const requestError = useSelector((state) => state.posts.requests?.REGISTER_USER?.error);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUserRequest(formData));
        setFormData({ login: '', password: '', avatar: '', phone: '' }); // Clear form
        navigate('/');
    };

    return (
        <div>
            <h1>Register</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {requestError && <p style={{ color: 'red' }}>{requestError}</p>}
            <form onSubmit={handleSubmit}>
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
                <input
                    type="text"
                    name="avatar"
                    placeholder="Avatar URL"
                    value={formData.avatar}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;