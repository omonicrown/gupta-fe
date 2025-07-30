import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import configs from "../../configs";
import { store } from "../../store/store";

export class AdminSmsApis extends AxiosGlobal {

    // SMS Dashboard
    getSmsDashboard(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/admin/sms/dashboard`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    // Sender IDs Management
    getAllSenderIds(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        const params = new URLSearchParams();
        if (query.status) params.append('status', query.status);
        if (query.search) params.append('search', query.search);
        if (query.per_page) params.append('per_page', query.per_page);

        const url = pageUrl || `${configs.context}/admin/sms/sender-ids${params.toString() ? '?' + params.toString() : ''}`;

        return this.axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    updateSenderIdStatus(id: number, data: { status: string, rejection_reason?: string }): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.context}/admin/sms/sender-ids/${id}/status`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    // Messages Management
    getAllMessages(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        const params = new URLSearchParams();
        if (query.status) params.append('status', query.status);
        if (query.user_id) params.append('user_id', query.user_id);
        if (query.start_date) params.append('start_date', query.start_date);
        if (query.end_date) params.append('end_date', query.end_date);
        if (query.per_page) params.append('per_page', query.per_page);

        const url = pageUrl || `${configs.context}/admin/sms/messages${params.toString() ? '?' + params.toString() : ''}`;

        return this.axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    // SMS Users Management
    getAllSmsUsers(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        const params = new URLSearchParams();
        if (query.search) params.append('search', query.search);
        if (query.per_page) params.append('per_page', query.per_page);

        const url = pageUrl || `${configs.context}/admin/sms/users${params.toString() ? '?' + params.toString() : ''}`;

        return this.axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    updateUserWalletStatus(userId: number, data: { status: string }): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.context}/admin/sms/users/${userId}/wallet-status`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    addFundsToUser(userId: number, data: { amount: number, description?: string }): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/admin/sms/users/${userId}/add-funds`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    // Campaigns Management
    getAllCampaigns(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        const params = new URLSearchParams();
        if (query.status) params.append('status', query.status);
        if (query.search) params.append('search', query.search);
        if (query.per_page) params.append('per_page', query.per_page);

        const url = pageUrl || `${configs.context}/admin/sms/campaigns${params.toString() ? '?' + params.toString() : ''}`;

        return this.axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    // Platform Settings
    getSmsSettings(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/admin/sms/settings`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    updateSmsSettings(data: {
        cost_per_segment: number,
        daily_limit_per_user: number,
        monthly_limit_per_user: number,
        minimum_wallet_balance: number,
        auto_approve_sender_ids: boolean
    }): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.context}/admin/sms/settings`, data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().data.login.value.token}`,
                "Access-Control-Allow-Origin": "*"
            },
        });
    }
}