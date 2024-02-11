import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        // console.log(credentials);
    }


    const register = async () => {
        try {
            if (credentials.password !== credentials.confirmPassword) {
                return console.log('Password do not match');
            }

            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { credentials }, { withCredentials: true })
            if (data.ok) {
                return console.log(data);
            }

        } catch (error) {
            console.log(error);
        }


    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    useEffect(() => { }, [])

    return (
        <>
            <div>Register</div>
            <div>
                <input type="email" placeholder="Email" name='email' onChange={handleChange} required />
                <input type="text" placeholder="Username" name='username' onChange={handleChange} />
                <div>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" name='password' onChange={handleChange} required />
                    <button onClick={togglePasswordVisibility} style={{ border: 'none', background: 'none' }}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                <div>
                    <input type={showPassword2 ? 'text' : 'password'} placeholder="Confirm Password" name='confirmPassword' onChange={handleChange} required  />
                    <button onClick={togglePasswordVisibility2} style={{ border: 'none', background: 'none' }}>
                        <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} />
                    </button>
                </div>

            </div>
            <div>
                <button onClick={register}>Register</button>
            </div>
        </>
    )
}

export default Register