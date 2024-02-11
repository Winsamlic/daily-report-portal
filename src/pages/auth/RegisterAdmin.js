import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';



const RegisterAdmin = () => {
    const navigate = useNavigate();

    const [decodedToken, setDecodedToken] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        id: "",
        confirmPassword: ''
    });



    const location = useLocation();

    useEffect(() => {
        // Get the token from the query string in the URL
        const searchParams = new URLSearchParams(location.search);
        const tokenParam = searchParams.get('token');

        // Decode the token
        if (tokenParam) {
            const decoded = jwtDecode(tokenParam);
            setDecodedToken(decoded);
            setFormData(prevState => ({
                ...prevState,
                email: decoded.admin,
                id: decoded.user.id

            }));
        }
    }, [location.search]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Add your form submission logic here
        // console.log(formData);
        delete formData.confirmPassword
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/confirm-admin`, formData, { withCredentials: true });

            if (data.ok) {
                navigate('/login');
            }

        } catch (error) {

        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* <pre>{JSON.stringify(decodedToken, null, 4)}</pre> */}

            <div>
                <div style={{ marginBottom: 30 }}>Register Admin</div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="name" placeholder='Admin Name' name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} disabled />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Password Confirm' value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default RegisterAdmin;
