import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import supabase from './supabaseClient'; // Ensure this points to your configured Supabase client

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        } else {
            // No need for a popup, navigate directly
            history.push('/home');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup} className="auth-form">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                <p style={{ marginTop: '10px' }}>Already have an account? <Link to="/">Log in</Link></p>
            </form>
        </div>
    );
}

export default Signup;
