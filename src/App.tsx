import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './Components/Pages/Auth/Register'
import Login from './Components/Pages/Auth/Login';
import Index from './Components/Pages/Auth/index';
import MultiLinks from './Components/admin/TiredLink';
import Mylinks from './Components/admin/MyLinks';
import RedirectLinks from './Components/admin/RedirectLink';
import CreateLink from './Components/admin/CreateLink';
import CreateRedirectLink from './Components/admin/CreateRedirectLink';
import CreateProduct from './Components/admin/CreateProduct';
import EditProduct from './Components/admin/EditProduct';
import LinkDetails from './Components/admin/ViewLinkDetails';
import EditMultiLink from './Components/admin/EditMultiLink';
import ViewMultiPage from './Components/admin/ViewMultiPage';
import ViewProductPage from './Components/admin/ViewProductPage';
import ViewProductDetailPage from './Components/admin/ViewProductDetailsPage';
import CreateMultiLink from './Components/admin/CreateMultiLink';
import Formlink from './Components/admin/FormLinks';
import MiniStore from './Components/admin/MiniStores';
// import LinkDetails from './Components/admin/ViewLinkDetails';
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
      </Routes>
    </div>
  );
}

export default App;
