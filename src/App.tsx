import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './Components/Pages/Auth/Register'
import Login from './Components/Pages/Auth/Login';
import Index from './Components/Pages/Auth/index';
import MultiLink from './Components/admin/TiredLink';
import CreateMultiLink from './Components/admin/CreateMultiLink';
import UpdateMultiLink from './Components/admin/EditMultiLink';
import Mylinks from './Components/admin/MyLinks';
import CreateLink from './Components/admin/CreateLink';
import LinkDetails from './Components/admin/LinkDetails';
import Formlink from './Components/admin/FormLinks';
import Chatrouting from './Components/admin/ChatRouting';
import EditUserMessage from './Components/admin/EditUserMessage';
import EditProfile from './Components/admin/EditProfile';
import ProPlan from './Components/admin/ProPlans';
import SideBar from './Components/Sidebar/index';
import Home from './Components/Pages/Home';


function App() {
  return (
    <div>
    
      {/* <Navbar/> */}
      
      <Routes>
      {/* <Route  path="/" element={<Index/>}/> */}
      <Route  path="/" element={<Home/>}/>
           <Route  path="/login" element={<Login/>}/>
           <Route  path="/register" element={<Register/>}/>
           {/* <Route  path="/login" element={<Login/>}/> */}
           <Route  path="/mylinks" element={<Mylinks/>}/>
           <Route  path="/createlink" element={<CreateLink/>}/>
           <Route  path="/linkDetails/:linkId" element={<LinkDetails/>}/>
           <Route  path="/EditUserMessage" element={<EditUserMessage/>}/>
           <Route  path="/editprofile" element={<EditProfile/>}/>
           <Route  path="/formlinks" element={<Formlink/>}/>
           <Route  path="/multi-links" element={<MultiLink/>}/>
           <Route  path="/create-multi-link" element={<CreateMultiLink/>}/>
           <Route  path="/update-multi-link/:linkId" element={<UpdateMultiLink/>}/>
           <Route  path="/chatrouting" element={<Chatrouting/>}/>
           <Route  path='/sidebar' element={<SideBar/>}/>
           <Route  path='/proplan' element={<ProPlan/>}/>
      </Routes>
    </div>
  );
}

export default App;
