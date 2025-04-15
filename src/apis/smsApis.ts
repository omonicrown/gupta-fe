import axios from "axios";
import { AxiosResponse, AxiosRequestHeaders } from "axios";
import { store } from "../store/store";

const BASE_URL = process.env.REACT_APP_API_URL || "https://link.mygupta.co";

// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const getAuthHeader = (): AxiosRequestHeaders => {
    const token = store.getState().data.login.value.token;
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

const getApiKeyHeader = (): AxiosRequestHeaders => {
    const apiKey = localStorage.getItem("api_key");
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {})
    };
};

const getFormDataHeader = (): AxiosRequestHeaders => {
    const token = store.getState().data.login.value.token;
    return {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

export const SmsApis = {
    // Analytics endpoints
    getDashboardStatistics: (): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/analytics/dashboard`, {
            headers: getAuthHeader(),
        });
    },

    getMessageAnalytics: (startDate: string, endDate: string): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/analytics/messages`, {
            params: { start_date: startDate, end_date: endDate },
            headers: getAuthHeader(),
        });
    },

    getFinancialAnalytics: (startDate: string, endDate: string): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/analytics/financial`, {
            params: { start_date: startDate, end_date: endDate },
            headers: getAuthHeader(),
        });
    },

    getCampaignAnalytics: (campaignId: number): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/analytics/campaigns/${campaignId}`, {
            headers: getAuthHeader(),
        });
    },

    exportMessageAnalytics: (startDate: string, endDate: string): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/analytics/messages/export`, {
            params: { start_date: startDate, end_date: endDate },
            headers: getAuthHeader(),
            responseType: "blob",
        });
    },

    // Contacts endpoints
    getContacts: (
        perPage = 15,
        search = "",
        groupId = ""
    ): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/contacts`, {
            params: {
                per_page: perPage,
                search: search,
                group_id: groupId,
            },
            headers: getAuthHeader(),
        });
    },

    getContact: (id: number): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/contacts/${id}`, {
            headers: getAuthHeader(),
        });
    },

    createContact: (contactData: FormData): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/contacts`, contactData, {
            headers: getFormDataHeader(),
        });
    },

    updateContact: (id: number, contactData: FormData): Promise<AxiosResponse<any>> => {
        return axios.put(`${BASE_URL}/api/contacts/${id}`, contactData, {
            headers: getFormDataHeader(),
        });
    },

    deleteContact: (id: number): Promise<AxiosResponse<any>> => {
        return axios.delete(`${BASE_URL}/api/contacts/${id}`, {
            headers: getAuthHeader(),
        });
    },

    importContacts: (importData: FormData): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/contacts/import`, importData, {
            headers: getFormDataHeader(),
        });
    },

    // Groups endpoints
    getGroups: (perPage = 15, search = ""): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/groups`, {
            params: {
                per_page: perPage,
                search: search,
            },
            headers: getAuthHeader(),
        });
    },

    getGroup: (id: number): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/groups/${id}`, {
            headers: getAuthHeader(),
        });
    },

    createGroup: (groupData: any): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/groups`, groupData, {
            headers: getAuthHeader(),
        });
    },

    updateGroup: (id: number, groupData: any): Promise<AxiosResponse<any>> => {
        return axios.put(`${BASE_URL}/api/groups/${id}`, groupData, {
            headers: getAuthHeader(),
        });
    },

    deleteGroup: (id: number): Promise<AxiosResponse<any>> => {
        return axios.delete(`${BASE_URL}/api/groups/${id}`, {
            headers: getAuthHeader(),
        });
    },

    addContactsToGroup: (groupId: number, contacts: number[]): Promise<AxiosResponse<any>> => {
        return axios.post(
            `${BASE_URL}/api/groups/${groupId}/contacts`,
            { contacts },
            { headers: getAuthHeader() }
        );
    },

    removeContactsFromGroup: (groupId: number, contacts: number[]): Promise<AxiosResponse<any>> => {
        return axios.delete(`${BASE_URL}/api/groups/${groupId}/contacts`, {
            headers: getAuthHeader(),
            data: { contacts },
        });
    },

    // Messages endpoints
    getMessages: (
        perPage = 15,
        status = "",
        search = "",
        campaignId = ""
    ): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/messages`, {
            params: {
                per_page: perPage,
                status: status,
                search: search,
                campaign_id: campaignId,
            },
            headers: getAuthHeader(),
        });
    },

    getMessage: (id: number): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/messages/${id}`, {
            headers: getAuthHeader(),
        });
    },

    createMessage: (messageData: any): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/messages`, messageData, {
            headers: getAuthHeader(),
        });
    },

    sendMessage: (id: number): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/messages/${id}/send`, {}, {
            headers: getAuthHeader(),
        });
    },

    scheduleMessage: (id: number, scheduledAt: string): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/messages/${id}/schedule`,
            { scheduled_at: scheduledAt },
            { headers: getAuthHeader() }
        );
    },

    cancelScheduledMessage: (id: number): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/messages/${id}/cancel`, {}, {
            headers: getAuthHeader(),
        });
    },

    deleteMessage: (id: number): Promise<AxiosResponse<any>> => {
        return axios.delete(`${BASE_URL}/api/messages/${id}`, {
            headers: getAuthHeader(),
        });
    },

    // Direct SMS send with API key
    sendSmsWithApiKey: (data: any): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/sms/send`, data, {
            headers: getApiKeyHeader(),
        });
    },

    checkSmsStatus: (messageId: string): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/sms/status`, {
            params: { message_id: messageId },
            headers: getApiKeyHeader(),
        });
    },


    // Templates endpoints
    getTemplates: (perPage = 15, search = "") => {
        return axios.get(`${BASE_URL}/api/templates`, {
            params: {
                per_page: perPage,
                search: search,
            },
            headers: getAuthHeader(),
        });
    },

    getTemplate: (id: number) => {
        return axios.get(`${BASE_URL}/api/templates/${id}`, {
            headers: getAuthHeader(),
        });
    },

    createTemplate: (templateData: any) => {
        return axios.post(`${BASE_URL}/api/templates`, templateData, {
            headers: getAuthHeader(),
        });
    },

    updateTemplate: (id: number, templateData: any) => {
        return axios.put(`${BASE_URL}/api/templates/${id}`, templateData, {
            headers: getAuthHeader(),
        });
    },

    deleteTemplate: (id: number) => {
        return axios.delete(`${BASE_URL}/api/templates/${id}`, {
            headers: getAuthHeader(),
        });
    },

    // Campaigns endpoints
    getCampaigns: (perPage = 15, status = "", search = "") => {
        return axios.get(`${BASE_URL}/api/campaigns`, {
            params: {
                per_page: perPage,
                status: status,
                search: search,
            },
            headers: getAuthHeader(),
        });
    },

    getCampaign: (id: number) => {
        return axios.get(`${BASE_URL}/api/campaigns/${id}`, {
            headers: getAuthHeader(),
        });
    },

    createCampaign: (campaignData: any) => {
        return axios.post(`${BASE_URL}/api/campaigns`, campaignData, {
            headers: getAuthHeader(),
        });
    },

    updateCampaign: (id: number, campaignData: any) => {
        return axios.put(`${BASE_URL}/api/campaigns/${id}`, campaignData, {
            headers: getAuthHeader(),
        });
    },

    deleteCampaign: (id: number) => {
        return axios.delete(`${BASE_URL}/api/campaigns/${id}`, {
            headers: getAuthHeader(),
        });
    },

    // Sender IDs endpoints
    getSenderIds: (perPage = 15, status = "") => {
        return axios.get(`${BASE_URL}/api/sender-ids`, {
            params: {
                per_page: perPage,
                status: status,
            },
            headers: getAuthHeader(),
        });
    },

    getSenderId: (id: number) => {
        return axios.get(`${BASE_URL}/api/sender-ids/${id}`, {
            headers: getAuthHeader(),
        });
    },

    createSenderId: (senderIdData: any) => {
        return axios.post(`${BASE_URL}/api/sender-ids`, senderIdData, {
            headers: getAuthHeader(),
        });
    },

    uploadSenderIdDocument: (id: number, document: File) => {
        const formData = new FormData();
        formData.append("document", document);

        return axios.post(`${BASE_URL}/api/sender-ids/${id}/document`, formData, {
            headers: getFormDataHeader(),
        });
    },

    checkSenderIdStatus: (id: number) => {
        return axios.get(`${BASE_URL}/api/sender-ids/${id}/status`, {
            headers: getAuthHeader(),
        });
    },

    deleteSenderId: (id: number) => {
        return axios.delete(`${BASE_URL}/api/sender-ids/${id}`, {
            headers: getAuthHeader(),
        });
    },

    // API Keys endpoints
    getApiKeys: () => {
        return axios.get(`${BASE_URL}/api/api-keys`, {
            headers: getAuthHeader(),
        });
    },

    createApiKey: (name: string, expiresAt: string) => {
        return axios.post(`${BASE_URL}/api/api-keys`, { name, expires_at: expiresAt }, {
            headers: getAuthHeader(),
        });
    },

    deleteApiKey: (id: number) => {
        return axios.delete(`${BASE_URL}/api/api-keys/${id}`, {
            headers: getAuthHeader(),
        });
    },

    toggleApiKey: (id: number) => {
        return axios.patch(`${BASE_URL}/api/api-keys/${id}/toggle`, {}, {
            headers: getAuthHeader(),
        });
    },
};


export const SmsWalletApis = {
    // Get wallet details
    getWalletDetails: (): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/wallet`, {
            headers: getAuthHeader(),
        });
    },

    // Get wallet balance
    getWalletBalance: (): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/wallet/balance`, {
            headers: getAuthHeader(),
        });
    },

    // Get transaction history
    getTransactions: (
        perPage = 15,
        type = "",
        status = ""
    ): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/wallet/transactions`, {
            params: {
                per_page: perPage,
                type: type,
                status: status
            },
            headers: getAuthHeader(),
        });
    },

    // Get transaction details
    getTransaction: (id: number): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/wallet/transactions/${id}`, {
            headers: getAuthHeader(),
        });
    },

    // Initiate payment
    initiatePayment: (data: {
        amount: number,
        currency?: string,
        description?: string,
        redirect_url?: string
    }): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/wallet/fund`, data, {
            headers: getAuthHeader(),
        });
    },

    // Verify payment
    verifyPayment: (transactionReference: string): Promise<AxiosResponse<any>> => {
        return axios.post(`${BASE_URL}/api/wallet/verify`,
            { transaction_reference: transactionReference },
            { headers: getAuthHeader() }
        );
    },

    // Generate invoice
    generateInvoice: (id: number): Promise<AxiosResponse<any>> => {
        return axios.get(`${BASE_URL}/api/wallet/transactions/${id}/invoice`, {
            headers: getAuthHeader(),
            responseType: 'blob',
        });
    }
};