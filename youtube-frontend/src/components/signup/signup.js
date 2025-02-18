import React, { useState } from "react";
import './signup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { LinearProgress, Box, Typography } from '@mui/material';
const Signup = () => {
    const [userProfilePic, setUserProfilePic] = useState("https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6557420216a456cfaef685c0_6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1-p-1600.jpg");
    const [ loader , setloader] = useState(false)
    const navigate = useNavigate()
    const [signupInput, setSignupInput] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "channelLogo": userProfilePic })
    const handleInputOnChange = (event, name) => {
        setSignupInput({
            ...signupInput, [name]: event.target.value
        })
    }
    const handleProfileImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
        data.append("upload_preset", "youtube-clone")
        try {
            setloader(true)
            const response = await axios.post("https://api.cloudinary.com/v1_1/dvlmos2jw/image/upload", data)
            const imageUrl = response.data.url;
            setUserProfilePic(imageUrl)
            setSignupInput({
                ...signupInput, "channelLogo": imageUrl
            })
            setloader(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSignupButton = async () => {
        setloader(true);
        await axios.post("http://localhost:8000/user/signup", signupInput)
            .then((res) => {
                toast.success(res.data);
                navigate('/')
                setloader(false);
            }).catch((error) => {
                toast.error(error);
                setloader(false);
            })
    }
    return (
        <div className="signup">
            <div className="singupformat">
                <div className="signup-top-format">
                    <div className="signup-youtube-logo">
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                    <div className="signup-tag">
                        Signup
                    </div>
                </div>
                <div className="signup-middle-format">
                    <div className="signup-main-input">
                        <input type="text" name="channelName" value={signupInput.channelName} onChange={(e) => { handleInputOnChange(e, "channelName") }} className="signup-input" placeholder="Channel Name" />
                    </div>
                    <div className="signup-main-input">
                        <input type="text" name="userName" value={signupInput.userName} onChange={(e) => { handleInputOnChange(e, "userName") }} className="signup-input" placeholder="Username" />
                    </div>
                    <div className="signup-main-input">
                        <input type="password" name="channelName" value={signupInput.password} onChange={(e) => { handleInputOnChange(e, "password") }} className="signup-input" placeholder="Password" />
                    </div>
                    <div className="signup-main-input">
                        <input type="text" name="about" value={signupInput.about} onChange={(e) => { handleInputOnChange(e, "about") }} className="signup-input" placeholder="About your channel" />
                    </div>
                    <div className="signup-logo-input">
                        Profile Image <input type="file" name="ChannelLogo" onChange={(e) => { handleProfileImage(e) }} />
                    </div>
                    <div className="profileimage">
                        <img src={userProfilePic} alt="Profile logo" className="main-profile-image" />
                    </div>
                </div>
                <div className="singup-down-format">
                    <div className="signup-main-button">
                        <button type="button" className="signup-btn" onClick={handleSignupButton}>Signup</button>
                    </div>
                    <Link to={'/'} className="signup-main-button">
                        <button type="button" className="signup-btn">Home</button>
                    </Link>
                    {
                        loader && <div className="loader">
                        <Box width="100%" sx={{ mt: 2 }}>
                            <Typography variant="body1" align="center"> </Typography>
                            <LinearProgress color="secondary" />
                        </Box>
                    </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup;