import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import supabase from './supabaseClient';
import './AuthStyles.css'; // Import the styles

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            alert(error.message);
        } else {
            alert('Logged in successfully!');
            history.push('/home'); // Redirect to home page
            // Redirect to a dashboard or home page as needed
            // history.push('/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <p>Don't have an account? <a className="link" onClick={() => history.push('/signup')}>Sign up</a></p>
            </form>
        </div>
    );
}

export default Login;
