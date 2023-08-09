import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './Components/Pages/Auth/Register'
import Login from './Components/Pages/Auth/Login';
import Index from './Components/Pages/Auth/index';
import Dashboard from './Components/admin/Dashboard';
import Mylinks from './Components/admin/MyLinks';
import CreateLink from './Components/admin/CreateLink';
import Formlink from './Components/admin/FormLinks';
import Chatrouting from './Components/admin/ChatRouting';
import EditUserMessage from './Components/admin/EditUserMessage';
import EditProfile from './Components/admin/EditProfile';
import ProPlan from './Components/admin/ProPlans';
import SideBar from './Components/Sidebar/index';


function App() {
  return (
    <div>
    
      {/* <Navbar/> */}
      
      <Routes>
      <Route  path="/" element={<Index/>}/>
           <Route  path="/login" element={<Login/>}/>
           <Route  path="/register" element={<Register/>}/>
           {/* <Route  path="/login" element={<Login/>}/> */}
           <Route  path="/mylinks" element={<Mylinks/>}/>
           <Route  path="/createlink" element={<CreateLink/>}/>
           <Route  path="/EditUserMessage" element={<EditUserMessage/>}/>
           <Route  path="/editprofile" element={<EditProfile/>}/>
           <Route  path="/formlinks" element={<Formlink/>}/>
           <Route  path="/tieredlinks" element={<Dashboard/>}/>
           <Route  path="/chatrouting" element={<Chatrouting/>}/>
           <Route  path='/sidebar' element={<SideBar/>}/>
           <Route  path='/proplan' element={<ProPlan/>}/>
      </Routes>
    </div>
  );
}

export default App;
