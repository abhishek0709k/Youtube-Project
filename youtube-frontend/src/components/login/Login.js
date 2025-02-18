import React, { useState } from "react";
import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate()
    const [loginInput, setLoginInput] = useState({ "userName": "", "password": "" })
    const handleInputOnChange = (event: any, name: any) => {
        setLoginInput({
            ...loginInput, [name]: event.target.value
        })
    } 
    console.log(loginInput)
    const handleLoginButton = async () => {
        await axios.post("http://localhost:8000/user/login", loginInput , {withCredentials : true})
            .then((res) => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.user._id)
                localStorage.setItem("userChannelLogo", res.data.user.channelLogo);
                window.location.reload();
                navigate('/')
            })
            .catch((err) => {
                toast.error("Invalid Credentials");
                console.log(err)
            })
    }
    return (
        <div className="login">
            <div className="loginformat">
                <div className="login-top-format">
                    <div className="login-youtube-logo">
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                    <div className="login-tag">
                        Login
                    </div>
                </div>
                <div className="login-middle-format">
                    <div className="login-page-input">
                        <input type="text" name="userName" value={loginInput.userName} placeholder="Username" onChange={(e) => { handleInputOnChange(e, "userName") }} className="login-input" />
                    </div>
                    <div className="login-page-input">
                        <input type="password" value={loginInput.password} onChange={(e: any) => { handleInputOnChange(e, "password") }} placeholder="Password" className="login-input" />
                    </div>
                </div>
                <div className="login-down-format">
                    <div className="login-main-button">
                        <button type="button" className="login-btn" onClick={handleLoginButton}>Login</button>
                    </div>
                    <Link to={'/signupUser'} className="login-main-button">
                        <button type="button" className="login-btn">Signup</button>
                    </Link>
                    <Link to={'/'} className="login-main-button">
                        <button type="button" className="login-btn">Home</button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;