import React, { useState, useEffect , useCallback } from "react";
import './video.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
const Video = () => {
    const [comment, setComment] = useState("");
    const [Data, setData] = useState(null)
    const [videoUrl, setVideoUrl] = useState("")
    const [comments, setComments] = useState([])
    const { id } = useParams();
    const fetchVideoById = useCallback(async () => {
        await axios.get(`http://localhost:8000/video/getVideo/${id}`)
            .then((res) => {
                setData(res.data.video)
                setVideoUrl(res.data.video.video)
            })
            .catch((err) => {
                console.log(err)
            })
    } , [id])
    const fetchCommentByVideoId = useCallback(async () => {
        await axios.get(`http://localhost:8000/comment/getcommentbyvideoId/${id}`)
            .then((response) => {
                console.log(response.data.Comment)
                setComments(response.data.Comment)
            }).catch((err) => {
                console.log(err)
            })
    } , [id])
    useEffect(() => {
        fetchVideoById();
        fetchCommentByVideoId();

    }, [fetchVideoById , fetchCommentByVideoId]);
    const handleCommentButton = async()=>{
        await axios.post("http://localhost:8000/comment/usercomment" , {"comment" : comment , "video" : id} , {withCredentials : true})
        .then((res)=>{
            console.log(res.data.comment)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="video">
            { Data &&
                <div className="youtube-post-section">
                    <div className="youtube-video">
                        <video width='1100px' height='600px' autoPlay controls className="videos-youtube-video">
                            <source src={videoUrl} type="video/mp4" />
                            <source src={videoUrl} type="video/webm" />
                            Your browser is not supporting the video
                        </video>
                    </div>
                    <div className="video-profile">
                        <div className="video-title">
                            {Data.title}
                        </div>
                        <div className="about-channel-div">
                            <Link to={`/channelprofile/${Data.user._id}`} className="channel-profile-image">
                                <img src={Data.user.channelLogo} alt="channel logo" className="video-channel-logo" />
                            </Link>
                            <div className='channel-video-info'>
                                <p className='title-channel-name'>{Data.user.channelName}</p>
                                <p className='channel-subscribers'>{Data.user.createdAt.slice(0, 10)}</p>
                            </div>
                            <div className="subscribe-div">
                                <button type="button" className="subscribe-button">Subscribe</button>
                            </div>
                            <div className="like-unlike-div">
                                <div className="like-button">
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    <p className="like-number">{Data.like}</p>
                                </div>
                                <div className="unlike-button">
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="discription">
                        <div className="video-discription-content">
                            <div className="discription-views">{Data.createdAt.slice(0, 10)}</div>
                        </div>
                        <div className="main-discription">
                            <div className="about-video">{Data.discription}</div>
                        </div>


                    </div>
                    <div className="comments">
                        <div className="comment-div">
                            { comments?.length } Comments
                        </div>
                        <div className="comment-input">
                            <div className="comment-user-profile">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="input-div">
                                <input type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Comments" className="comment-space-input" />
                            </div>
                            <div className="comment-button">
                                <button type="text" className="subscribe-button apply-comment" onClick={handleCommentButton}>Comment</button>
                            </div>
                        </div>
                        {
                            comments?.map((item, index) => {
                                return (
                                    <div className="show-comments">
                                        <div className="comment-profile-image">
                                            <img src={ item?.user?.channelLogo } alt="channel-logo" className="comment-channel-logo"/>
                                        </div>
                                        <div className="show-comment-name">
                                            <div className="commentor-name">{item.user.userName}</div>
                                            <div className="user-comment">{item.comment}</div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            }
            <div className="youtube-suggestions-section">
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>
                <div className="suggestion-videos">
                    <div className="suggestion-video-thumbnail">
                        <img src='https://ihitthebutton.com/wp-content/uploads/2023/04/youtube-thumbnail-size-1-1024x576.jpg' alt='thumbnail-picture' className='suggestion-thumbnail-picture' />
                    </div>
                    <div className="suggestion-title">
                        <div className="suggestion-video-title">
                            New trending video
                        </div>
                        <div className="suggestion-channel-name">
                            Vivek Fact Story
                        </div>
                        <div className="suggestion-video-info">
                            <div className="suggestion-videos-views">20K</div>
                            <div className="suggestion-videos-time">2 years</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Video;