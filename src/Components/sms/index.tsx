// Export all SMS Platform components 
// This allows importing from a single location like:
// import { Analytics, Contacts } from './Components/sms';

// Main Pages
export { default as SmsDashboard } from './SmsDashboard';
export { default as Analytics } from './Analytics';
export { default as Contacts } from './SmsContacts';
export { default as CreateContact } from './CreateContact';
export { default as ImportContacts } from './ImportContacts';
export { default as ContactGroups } from './ContactGroups';
export { default as CreateContactGroup } from './CreateContactGroup';

// Analytics Components 
export { default as StatisticCard } from './AnalyticsConponent/StatisticCard';
export { default as MessageStatusChart } from './AnalyticsConponent/MessageStatusChart';
export { default as MessageTimeline } from './AnalyticsConponent/MessageTimeline';
export { default as DateRangePicker } from './AnalyticsConponent/DateRangePicker';
export { default as SenderIdPerformance } from './AnalyticsConponent/SenderIdPerformance';

// Contact Components
export { default as ContactsList } from './ContactComponent/ContactsList';
export { default as ContactFilters } from './ContactComponent/ContactFilters';

// These will be implemented in future modules
// export { default as Messages } from './Messages';
// export { default as CreateMessage } from './CreateMessage';
// export { default as Templates } from './Templates';
// export { default as CreateTemplate } from './CreateTemplate';
// export { default as Campaigns } from './Campaigns';
// export { default as CreateCampaign } from './CreateCampaign';
// export { default as SenderIds } from './SenderIds';
// export { default as CreateSenderId } from './CreateSenderId';
// export { default as ApiKeys } from './ApiKeys';
// export { default as CreateApiKey } from './CreateApiKey';