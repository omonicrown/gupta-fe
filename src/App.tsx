import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from './Components/Pages/Auth/EmailVerify';
import ForgotPassword from './Components/Pages/Auth/ForgotPword';
import ResetPassword from './Components/Pages/Auth/ResetPassword';
import PasswordSuccess from './Components/Pages/Auth/PwordResetSucces';
import EmailVerifyComplete from './Components/Pages/Auth/EmailVerifyComplete';
import Register from './Components/Pages/Auth/Register';
import Login from './Components/Pages/Auth/Login';
import Index from './Components/Pages/Auth/index';
import MultiLinks from './Components/user/TiredLink';
import Mylinks from './Components/user/MyLinks';
import PaymentDashboard from './Components/user/PaymentDashboard';
import Marketplace from './Components/Marketplace/Home';
import RedirectLinks from './Components/user/RedirectLink';
import CreateLink from './Components/user/CreateLink';
import CreateRedirectLink from './Components/user/CreateRedirectLink';
import Subscription from './Components/user/Subscription';
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
import Chatrouting from './Components/user/ChatRouting';
import EditUserMessage from './Components/user/EditUserMessage';
import EditProfile from './Components/user/EditProfile';
import ProPlan from './Components/user/ProPlans';
import SideBar from './Components/Sidebar/index';
import Home from './Components/Pages/Home';
import Dashboard from './Components/admin/Dashboard';
import UsersList from './Components/admin/UsersList';
import WitdrawalRequest from './Components/admin/WitdrawalRequest';
import UserDetails from './Components/admin/UserDetails';
import FAQ from './Components/Pages/FAQ';
import Pricing from './Components/Pages/Pricing';
import ProductDemo from './Components/Pages/ProductDemo';

// SMS Platform Components
import SmsDashboard from './Components/sms/SmsDashboard';
import Analytics from './Components/sms/Analytics';
import CreateContact from './Components/sms/CreateContact';
import EditContact from './Components/sms/EditContact';
import ImportContacts from './Components/sms/ImportContacts';
import ContactGroups from './Components/sms/ContactGroups';
import CreateContactGroup from './Components/sms/CreateContactGroup';
import EditContactGroup from './Components/sms/EditContactGroup';
import SenderIDManagement from './Components/sms/SenderIDManagement';
import ApiKeyManagement from './Components/sms/ApiKeyManagement';
import MessagesManagement from './Components/sms/MessagesManagement';
import Contacts from './Components/sms/SmsContacts';
import SmsWallet from './Components/sms/SmsWallet';
import VerifyPayment from './Components/sms/VerifyPayment';

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/product-demo" element={<ProductDemo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/password-success" element={<PasswordSuccess />} />
      <Route path="/email-verify/:email" element={<EmailVerifyComplete />} />

      <Route path="/mylinks" element={<Mylinks />} />
      <Route path="/payment-page" element={<PaymentDashboard />} />

      <Route path="/redirect-links" element={<RedirectLinks />} />
      <Route path="/createlink" element={<CreateLink />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/create-redirect-link" element={<CreateRedirectLink />} />
      <Route path="/createproduct" element={<CreateProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/update-multi-link/:linkId" element={<EditMultiLink />} />
      <Route path="/:linkId" element={<ViewMultiPage />} />
      <Route path="/s/:storeId" element={<ViewProductPage />} />
      <Route path="/storedetails/:storeId" element={<ViewProductDetailPage />} />
      <Route path="/create-multi-link" element={<CreateMultiLink />} />
      <Route path="/EditUserMessage" element={<EditUserMessage />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/formlinks" element={<Formlink />} />
      <Route path="/mini-store" element={<MiniStore />} />
      <Route path="/link-details/:id" element={<LinkDetails />} />
      <Route path="/multi-links" element={<MultiLinks />} />
      <Route path="/chatrouting" element={<Chatrouting />} />
      <Route path='/sidebar' element={<SideBar />} />
      <Route path='/proplan' element={<ProPlan />} />

      {/* SMS Platform Routes */}
      <Route path='/sms-dashboard' element={<SmsDashboard />} />
      <Route path='/analytics' element={<Analytics />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route path='/create-contact' element={<CreateContact />} />
      <Route path='/import-contacts' element={<ImportContacts />} />
      <Route path='/edit-contact/:id' element={<EditContact />} />
      <Route path='/contact-groups' element={<ContactGroups />} />
      <Route path='/create-contact-group' element={<CreateContactGroup />} />
      <Route path='/edit-contact-group/:id' element={<EditContactGroup />} />

      <Route path='/sms-wallet' element={<SmsWallet />} />

      {/* These routes will be implemented in future phases */}
      {/* 
      <Route path='/messages' element={<Messages />} />
      <Route path='/create-message' element={<CreateMessage />} />
      <Route path='/templates' element={<Templates />} />
      <Route path='/create-template' element={<CreateTemplate />} />
      <Route path='/edit-template/:id' element={<CreateTemplate />} />
      <Route path='/campaigns' element={<Campaigns />} />
      <Route path='/create-campaign' element={<CreateCampaign />} />
      <Route path='/edit-campaign/:id' element={<CreateCampaign />} />
      <Route path='/sender-ids' element={<SenderIds />} />
      <Route path='/create-sender-id' element={<CreateSenderId />} />
      <Route path='/api-keys' element={<ApiKeys />} />
      <Route path='/create-api-key' element={<CreateApiKey />} />
      */}

      <Route path="/sender-ids" element={<SenderIDManagement />} />
      <Route path="/api-keys" element={<ApiKeyManagement />} />
      <Route path="/messages" element={<MessagesManagement />} />

      <Route path='/admin-dashboard' element={<Dashboard />} />
      <Route path='/admin-users' element={<UsersList />} />
      <Route path='/witdrawal-request' element={<WitdrawalRequest />} />
      <Route path='/user-details/:id' element={<UserDetails />} />
      <Route path='/verify-payment' element={<VerifyPayment />} />

      {/* Marketplace */}
      <Route path='/marketplace' element={<Marketplace />} />
    </Routes>
  );
}

export default AppRoutes;