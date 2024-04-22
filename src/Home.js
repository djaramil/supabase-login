import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import supabase from './supabaseClient';

function Home() {
    const [user, setUser] = useState(null);
    const history = useHistory(); // Instantiate useHistory for navigation

    useEffect(() => {
        const currentUser = supabase.auth.user();
        if (!currentUser) {
            // If no user is found in local storage, redirect to the login page
            history.push('/');
        } else {
            setUser(currentUser);
        }
    }, [history]);

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <div style={{ float: 'right' }}>
                {user ? `Logged in as: ${user.email}` : 'Not logged in'}
            </div>
        </div>
    );
}

export default Home;
