import React, { useContext } from 'react'
import { Context } from '../../context/index'

const Login = () => {
    const { state, dispatch } = useContext(Context);
    const data = ""
    dispatch({
        type: "LOGIN",
        payload: data,
    });
    return (
        <div>login</div>
    )
}

export default Login