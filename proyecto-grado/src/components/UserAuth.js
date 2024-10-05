import React, {useState} from 'react';

const UserAuth = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        const user = {email, password};
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        onLogin(user);
    };

    return (
        <div>
            {isLoggedIn ? (
                <p>Welcome, {email}</p>
                ) :(
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
                )
            }
        </div>
    );
};

export default UserAuth;