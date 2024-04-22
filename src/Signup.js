import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import supabase from './supabaseClient';
import './AuthStyles.css'; // Import the styles

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message);
        } else {
            alert('Registration successful. Check your email for verification!');
            history.push('/');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup} className="auth-form">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <a className="link" onClick={() => history.push('/')}>Login here</a></p>
            </form>
        </div>
    );
}

export default Signup;
