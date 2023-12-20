import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './Components/Pages/Auth/Register'
import Login from './Components/Pages/Auth/Login';
import Index from './Components/Pages/Auth/index';
import MultiLinks from './Components/user/TiredLink';
import Mylinks from './Components/user/MyLinks';
import RedirectLinks from './Components/user/RedirectLink';
import CreateLink from './Components/user/CreateLink';
import CreateRedirectLink from './Components/user/CreateRedirectLink';
import CreateProduct from './Components/user/CreateProduct';
import EditProduct from './Components/user/EditProduct';
import LinkDetails from './Components/user/ViewLinkDetails';
import EditMultiLink from './Components/user/EditMultiLink';
import ViewMultiPage from './Components/user/ViewMultiPage';
import ViewProductPage from './Components/user/ViewProductPage';
import ViewProductDetailPage from './Components/user/ViewProductDetailsPage';
import CreateMultiLink from './Components/user/CreateMultiLink';
import Formlink from './Components/user/FormLinks';
import MiniStore from './Components/user/MiniStores';
// import LinkDetails from './Components/admin/ViewLinkDetails';
import Chatrouting from './Components/user/ChatRouting';
import EditUserMessage from './Components/user/EditUserMessage';
import EditProfile from './Components/user/EditProfile';
import ProPlan from './Components/user/ProPlans';
import SideBar from './Components/Sidebar/index';
import Home from './Components/Pages/Home';
import Dashboard from './Components/admin/Dashboard';
import UsersList from './Components/admin/UsersList';
import UserDetails from './Components/admin/UserDetails';


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
           <Route  path="/redirect-links" element={<RedirectLinks/>}/>
           <Route  path="/createlink" element={<CreateLink/>}/>
           <Route  path="/create-redirect-link" element={<CreateRedirectLink/>}/>
           <Route  path="/createproduct" element={<CreateProduct/>}/>
           <Route  path="/edit-product/:id" element={<EditProduct/>}/>
           <Route  path="/update-multi-link/:linkId" element={<EditMultiLink/>}/>
           <Route  path="/:linkId" element={<ViewMultiPage/>}/>
           <Route  path="/store/:storeId" element={<ViewProductPage/>}/>
           <Route  path="/storedetails/:storeId" element={<ViewProductDetailPage/>}/>
           <Route  path="/create-multi-link" element={<CreateMultiLink/>}/>
           <Route  path="/EditUserMessage" element={<EditUserMessage/>}/>
           <Route  path="/editprofile" element={<EditProfile/>}/>  
           <Route  path="/formlinks" element={<Formlink/>}/>
           <Route  path="/mini-store" element={<MiniStore/>}/>
           <Route  path="/link-details/:id" element={<LinkDetails/>}/>
           <Route  path="/multi-links" element={<MultiLinks/>}/>
           <Route  path="/chatrouting" element={<Chatrouting/>}/>
           <Route  path='/sidebar' element={<SideBar/>}/>
           <Route  path='/proplan' element={<ProPlan/>}/>


           <Route  path='/admin-dashbord' element={<Dashboard/>}/>
           <Route  path='/admin-users' element={<UsersList/>}/>
           <Route  path='/user-details' element={<UserDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
