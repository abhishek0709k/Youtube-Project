import React, { useState, useEffect } from "react";
import './upload.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LinearProgress, Box, Typography } from '@mui/material';
const Upload = () => {
    const [uploadInput, setUploadInput] = useState({ "title": "", "discription": "", "category": "", "thumbnail": "", "video": "" })
    const [ loader , setloader ] = useState(false)
    const handleInputOnChange = (event, name) => {
        setUploadInput({
            ...uploadInput, [name]: event.target.value
        })
    }
    console.log(uploadInput)
    const navigate = useNavigate()
    const handleProfileImage = async (e, type) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
        data.append("upload_preset", "youtube-clone")
        try {
            setloader(true)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dvlmos2jw/${type}/upload`, data)
            const mainUrl = response.data.url;
            if (type === "image") {
                setUploadInput({
                    ...uploadInput, "thumbnail": mainUrl
                })
            } else {
                setUploadInput({
                    ...uploadInput, "video": mainUrl
                })
            }
            setloader(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        let userId = localStorage.getItem("userId");
        if (userId == null) {
            navigate('/')
        }
    })
    const handleUploadButton = async () => {
        await axios.post("http://localhost:8000/video/uploadvideo", uploadInput, { withCredentials: true })
            .then((res) => {
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="upload">
            <div className="upload-format">
                <div className="top-upload-format">
                    <div className="upload-youtube-logo">
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                    <div className="upload-video-tag">
                        Upload Video
                    </div>
                </div>
                <div className="upload-middle-format">
                    <div className="upload-video-input">
                        <input type="text" value={uploadInput.title} name="title" onChange={(e) => { handleInputOnChange(e, "title") }} placeholder="Title for video" className="upload-input" />
                    </div>
                    <div className="upload-video-input">
                        <input type="text" value={uploadInput.discription} name="discription" onChange={(e) => { handleInputOnChange(e, "discription") }} placeholder="Discription for video" className="upload-input" />
                    </div>
                    <div className="upload-video-input">
                        <input type="text" value={uploadInput.category} name="category" onChange={(e) => { handleInputOnChange(e, "category") }} placeholder="Category" className="upload-input" />
                    </div>
                    <div className="upload-video-component">
                        Thumbnail <input type="file" name="thumbnail" onChange={(e) => { handleProfileImage(e, "image") }} accept="/image/*" />
                    </div>
                    <div className="upload-video-component">
                        Video <input type="file" name="video" onChange={(e) => { handleProfileImage(e, "video") }} accept="/vidoe/mp4 , vidoe/webm , vidoe/*" />
                    </div>
                </div>
                <div className="upload-down-format">
                    <div className="upload-main-button">
                        <button type="button" className="video-btn" onClick={handleUploadButton}>Upload</button>
                    </div>
                    <Link to={'/'} className="upload-main-button">
                        <button type="button" className="video-btn">Home</button>
                    </Link>
                </div>
                { loader &&<div className="loader">
                    <Box width="100%" sx={{ mt: 2 }}>
                        <Typography variant="body1" align="center"> </Typography>
                        <LinearProgress color="secondary" />
                    </Box>
                </div> }
            </div>
        </div>
    )
}

export default Upload;