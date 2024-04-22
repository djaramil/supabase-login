import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import supabase from './supabaseClient';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store the login error message
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Using signInWithPassword instead of signIn
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message); // Set the error message to be displayed
        } else {
            history.push('/home'); // Redirect to the home page on successful login
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} {/* Display error message if there is one */}
            </form>
        </div>
    );
}

export default Login;
