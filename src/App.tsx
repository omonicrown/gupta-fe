import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './Components/Pages/Auth/Register'
import Login from './Components/Pages/Auth/Login';
import Index from './Components/Pages/Auth/index';
import MultiLinks from './Components/Admin/TiredLink'
import Mylinks from './Components/Admin/MyLinks';
import RedirectLinks from './Components/Admin/RedirectLink';
import CreateLink from './Components/Admin/CreateLink';
import CreateRedirectLink from './Components/Admin/CreateRedirectLink';
import CreateProduct from './Components/Admin/CreateProduct';
import EditProduct from './Components/Admin/EditProduct';
import LinkDetails from './Components/Admin/ViewLinkDetails';
import EditMultiLink from './Components/Admin/EditMultiLink';
import ViewMultiPage from './Components/Admin/ViewMultiPage';
import ViewProductPage from './Components/Admin/ViewProductPage';
import ViewProductDetailPage from './Components/Admin/ViewProductDetailsPage';
import CreateMultiLink from './Components/Admin/CreateMultiLink';
import Formlink from './Components/Admin/FormLinks';
import MiniStore from './Components/Admin/MiniStores';
// import LinkDetails from './Components/admin/ViewLinkDetails';
import Chatrouting from './Components/Admin/ChatRouting';
import EditUserMessage from './Components/Admin/EditUserMessage';
import EditProfile from './Components/Admin/EditProfile';
import ProPlan from './Components/Admin/ProPlans';
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
