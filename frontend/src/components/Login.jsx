import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dashboardRoutes = {
        sanil: '/payments',
        lasidu: '/products',
        navodi: '/feedbacks',
        tharaka: '/mchats',
        nawoda: '/gifts',
        indipa: '/deliverys',
        nawodya: '/events',
        milni: '/records',
        customer: '/products/card',
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const users = {
            sanil: 'payment123',
            lasidu: 'product123',
            navodi: 'feedback123',
            tharaka: 'chat123',
            nawoda: 'gift123',
            indipa: 'delivery123',
            nawodya: 'event123',
            milni: 'return123',
            customer: 'cus123'
        };

        if (users[username] === password) {
            navigate(dashboardRoutes[username]);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.headerText}>Welcome to the System</h1>
            </header>
            <div style={styles.container}>
                <div style={styles.loginContainer}>
                   <h2 style={styles.loginHeader}>Login</h2>
                    <form onSubmit={handleLogin} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>Login</button>
                    </form>
                </div>
            </div>
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Your Company Name</p>
            </footer>
        </div>
    );
};


export default Login;
