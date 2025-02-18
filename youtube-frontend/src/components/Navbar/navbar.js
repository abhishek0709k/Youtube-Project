import React, { useState , useEffect } from "react";
import './navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faSearch , faMicrophone , faBell } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ toogleSideNavbar })=>{
    const navigate = useNavigate()
    const [navbarModel , setNavbarModel] = useState(false);
    const [navbarUserChannelLogo , setNavbarUserChannelLogo] = useState('https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png')
    const [isLogedIn , setIsLogedIn] = useState(false)
    const changeModelValue = ()=>{
        setNavbarModel(previousValue=>!previousValue)
    }
    const logoutFunction = async()=>{
        localStorage.clear()
        await axios.post("http://localhost:8000/user/logout" , {} , {withCredentials : true})
        .then((res)=>{
            console.log(res)
            navigate('/')
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        let userChannelLogo = localStorage.getItem("userChannelLogo");
        setIsLogedIn(userChannelLogo!==null?true:false);
        if(userChannelLogo!==null){setNavbarUserChannelLogo(userChannelLogo)}
    } , [])

    return (
        <div className="Navbar">
            <div className="navbar-left">
                <div className="menu-logo">
                    <FontAwesomeIcon onClick={toogleSideNavbar} icon={faBars}/>
                </div>
                <Link to={'/'} className="youtube-logo-section">
                    <FontAwesomeIcon icon={faYoutube} className="youtube-logo"/>
                    <div className="youtube-title">YouTube</div>
                </Link>
            </div>
            <div className="navbar-center">
                <div className="input-div">
                    <input type="text" placeholder="Search" className="input-navbar"/>
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </div>
                <div className="microphone-div">
                    <FontAwesomeIcon icon={faMicrophone} className="microphone-logo"/>
                </div>
            </div>
            <div className="navbar-right">
                <Link to={'/uploadVideo'} className="create-text-div">
                    <p>+ Create</p>
                </Link>
                <div className="bell-logo-div">
                    <FontAwesomeIcon icon={faBell} className="bell-logo"/>
                </div>
                <div className="user-logo-div">
                    <img src={navbarUserChannelLogo} onClick={changeModelValue} alt="Profile logo" className="navbar-channel-logo"/>
                </div>
                    { navbarModel && 
                    <div className="user-info-div">
                        <div className="user-logo-model">
                            <img src={navbarUserChannelLogo}  alt="Profile logo" className="navbar-channel-logo"/>
                        </div>
                        { isLogedIn && <Link to={'/channelprofile/77'} className="user-model">Profile</Link>}
                        { isLogedIn && <div  className="user-model" onClick={logoutFunction}>Logout</div>}
                        { !isLogedIn && <Link to={"/loginpage"} className="user-model">Login</Link> }

                    </div>
                    }
            </div>
        </div>
    )
}

export default Navbar