import React from "react";
import './sidenavbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse , faClapperboard , faStar , faHistory , faBars , faVideo , faBook , faClock , faThumbsUp , faDownload , faArrowCircleRight , faUser} from "@fortawesome/free-solid-svg-icons";
const SideNavbar = ({ isOpen })=>{
    return (
        <aside className={`side-navbar${isOpen ? " open" : ""}`}>
        <div className="side-navbar">
            <div className="Home-page-top">
                <div className="side-nav-icon"><FontAwesomeIcon icon={faHouse}/>
                    <div className="sidenav-icon-title">Home</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faClapperboard}/>
                    <div className="sidenav-icon-title">Shorts</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faStar}/>
                    <div className="sidenav-icon-title">Subscription</div>
                </div>
            </div>
            <hr className="straight-line"/>
            <div className="Home-page-center">
                <div className="side-nav-icon">You
                    <div className="sidenav-icon-title">
                        <FontAwesomeIcon icon={faArrowCircleRight}/>
                    </div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faHistory}/>
                    <div className="sidenav-icon-title">History</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faBars}/>
                    <div className="sidenav-icon-title">Playlists</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faVideo}/>
                    <div className="sidenav-icon-title">Your Videos</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faBook}/>
                    <div className="sidenav-icon-title">Your courses</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faClock}/>
                    <div className="sidenav-icon-title">Watch Later</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faThumbsUp}/>
                    <div className="sidenav-icon-title">Liked Videos</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faDownload}/>
                    <div className="sidenav-icon-title">Downloads</div>
                </div>
            </div>
            <hr className="straight-line"/>
            <div className="Home-page-down">
                <div className="side-nav-icon">Subscription</div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">fukra Insaan</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">Khesari lokgeet</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">Dehati Bhojpuri lokgeet</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">Khesari ke lokgeets</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">Apna College</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">Code with harry</div>
                </div>
                <div className="side-nav-icon"><FontAwesomeIcon icon={faUser}/>
                    <div className="sidenav-icon-title">Piyush Garg</div>
                </div>
            </div>
        </div>
        </aside>
    )
}
export default SideNavbar
