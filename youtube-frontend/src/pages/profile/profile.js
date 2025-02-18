import React, { useState, useEffect } from "react";
import './profile.css'
import SideNavbar from "../../components/SideNavbar/sidenavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Profile = ({ sidebarToogle }) => {
    const [Data, setData] = useState([])
    const [user, setUser] = useState(null)
    const { id } = useParams();
    const fetchVideosByUserId = async () => {
        await axios.get(`http://localhost:8000/video/getallvideosbyuserId/${id}`)
            .then((res) => {
                console.log(res.data.videos)
                setData(res.data.videos)
                setUser(res.data.videos[0].user)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchVideosByUserId();
    }, [])
    return (
        <div className="profile">
            <SideNavbar isOpen={sidebarToogle} />
            <div className="channel-profile">
                { Data &&
                <div className="about-channel">
                    <div className="channel-logo">
                        <img src={user?.channelLogo} alt="chanenl-logo" className="profile-channel-logo"/>
                    </div>
                    <div className="channel-info">
                        <div className="info-channel-name">{user?.channelName}</div>
                        <div className="subscribers-likes-info">
                            <div className="info-channel-handle">{user?.userName} </div>
                            <div className="subscribers-info">{user?.createdAt.slice(0 , 10)}</div>
                            <div className="likes-info">{Data.length} Videos</div>
                        </div>
                        <div className="channel-info-discription">
                           {user?.about}
                        </div>
                        <div className="channel-info-buttons">
                            <button className="info-subscribe-button" type="button">Subscribe</button>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div className="channelprofile-videos-section">
                <div className="videos-top-section">
                    <div className="profile-videos-tab">Videos</div>
                    <div className="profile-videos-tab-icon">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>


                <div className="channelprofile-videos">
                    {
                        Data?.map((item, key) => {
                            return (
                                <Link to={`/watch/${item._id}`} className="profile-video">
                                    <div className="profile-video-thumbnail">
                                        <img src={item.thumbnail} alt='thumbnail-picture' className='profile-youtube-thumbnail-picture' />
                                    </div>
                                    <div className="profile-video-title">
                                        <div className="profile-mainvideo-title">{item.title}</div>
                                        <div className="profilevideo-views-time-info">
                                            <div className="profile-views-info">{item.like} likes</div>
                                            <div className="profile-time-info">{item.createdAt.slice(0 , 10)}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;