import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './homepage.css'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { useEffect , useState } from 'react'
import axios from 'axios'
const HomePage = ({ isOpen })=>{
    const [data , setdata] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/video/getallvideos")
        .then((res)=>{ 
          console.log(res.data.videos);
          setdata(res.data.videos)
        })
        .catch((err)=>{
          console.log(err)
        })
      }, [])
    return (
        <div className={isOpen?'full-home-page':"Home-page"}>
            <div className='Home-page-heading'>
                <div className='headings'>All</div>
                <div className='headings'>Music</div>
                <div className='headings'>Shark Tank</div>
                <div className='headings'>News</div>
                <div className='headings'>Podcast</div>
                <div className='headings'>Kapil Sharma Show</div>
                <div className='headings'>Mixes</div>
                <div className='headings'>Live</div>
                <div className='headings'>T-series</div>
                <div className='headings'>Computer Programming</div>
                <div className='headings'>Skills</div>
                <div className='headings'>Dramedy</div>
                <div className='headings'>Tamil Cinema</div>
                <div className='headings'>Stocks</div>
                <div className='headings'>Album</div>
                <div className='headings'>Web development</div>

            </div>
            <div className='videos-homepage'>
                <div className={isOpen?'full-main-homepage':'main-homepage'}>
                    {
                        data?.map((item , ind)=>{
                            return(
                                <Link to={`/watch/${item._id}`} className='youtube-videos'>
                                <div className='youtube-thumbnail'>
                                    <img src={item.thumbnail} alt='thumbnail-picture' className='youtube-thumbnail-picture'/>
                                </div>
                                <div className='thumbnail-profile'>
                                    <div className='profile-div'>
                                        <Link to={`/channelprofile/${item?.user?._id}`} className='thumbnail-profile-picture'>
                                            <img src={item?.user?.channelLogo} alt="channel logo" className='homepage-thumbnail-channel-logo'/>
                                        </Link>
                                    </div>
                                    <div className='thumbnail-video-title'>
                                        <p className='title-channel-name'>{item?.title}</p>
                                        <p className='thumbnail-title'>{item?.user?.channelName} </p>
                                        <p className='thumbnail-likes'>{item?.like} likes</p>
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

export default HomePage