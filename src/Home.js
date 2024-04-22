import React, { useState, useEffect, Link } from 'react';
import { useHistory } from 'react-router-dom';
import supabase from './supabaseClient';

function Home() {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const checkUser = async () => {
            const { data: userData, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error.message);
                history.push('/');
            }

            if (!userData) {
                history.push('/');
            } else {
                setUser(userData.user); // Assuming userData contains a nested user object
            }
        };

        checkUser();
    }, [history]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            history.push('/');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center', background: '#f0f0f0' }}>
            <h1>Welcome to the Home Page!</h1>
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: '10px' }}>Logged in as: {user.email}</span> {/* Correctly access the nested email */}
                        <button onClick={handleLogout} style={{ padding: '5px 15px', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <Link to="/">Go to Login</Link>
                )}
            </div>
        </div>
    );
}

export default Home;
