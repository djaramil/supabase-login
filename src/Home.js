import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import supabase from './supabaseClient';

function Home() {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const checkUser = async () => {
            const { data: user, error } = await supabase.auth.getUser();

            console.log(user.user.email); // Check what is returned here
            console.log(error); // Check for any errors

            if (error) {
                console.error('Error fetching user:', error.message);
                history.push('/'); // Redirect to login if there's an error fetching the user
            }

            if (!user) {
                history.push('/'); // Redirect to login if no user is logged in
            } else {
                setUser(user);
            }
        };

        checkUser();
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
