import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            try {
                const response = await axios.get('http://localhost:8000/protected-endpoint/');
                setData(response.data);
            } catch (error) {
                setError('Failed to fetch protected data');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Protected Data</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProtectedData;
