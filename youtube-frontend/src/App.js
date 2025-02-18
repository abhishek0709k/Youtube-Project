import React , {useState , useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home';
import { Route , Routes } from 'react-router-dom'
import Video from './pages/videos/video';
import Profile from './pages/profile/profile';
import Login from './components/login/Login';
import Upload from './components/upload/upload';
import Signup from './components/signup/signup';
import axios from 'axios';
function App() {
  const [sidebarToogle , setSidebarToogle] = useState(false);
    const toogleSideNavbar = ()=>{
        setSidebarToogle((previous)=>!previous)
    }
  // useEffect(()=>{
  //   axios.get("http://localhost:8000/video/getallvideos")
  //   .then((res)=>{ 
  //     console.log(res) 
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // })
  return (
    <div className="App">
      <Navbar toogleSideNavbar={toogleSideNavbar}/>
      <Routes>
        <Route path='/' element={<Home sidebarToogle={sidebarToogle}/>}/>
        <Route path='/watch/:id' element={<Video/>}/>
        <Route path='/channelprofile/:id' element={<Profile sidebarToogle={sidebarToogle}/>}/>
        <Route path='/loginpage' element={<Login/>}/>
        <Route path='/uploadVideo' element={<Upload/>}/>
        <Route path='/signupUser' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
