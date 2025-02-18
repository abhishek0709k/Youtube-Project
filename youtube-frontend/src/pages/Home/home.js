import './home.css'
import SideNavbar from "../../components/SideNavbar/sidenavbar"
import HomePage from "../../components/HomePage/homepage.js";
function Home ({ sidebarToogle }){
    return (
        <div className="Home">
            <SideNavbar isOpen={sidebarToogle} />
            <HomePage isOpen={sidebarToogle}/>
        </div>
    )
}
export default Home