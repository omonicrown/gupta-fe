import { AxiosPromise } from "axios";
import configs from "../configs";
import { AdminSmsApis } from "./live/AdminSmsApis";

export class AdminSmsApi {
    private static adminSmsApi: AdminSmsApis = new AdminSmsApis();

    // SMS Dashboard
    static getSmsDashboard(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.getSmsDashboard();
        }
    }

    // Sender IDs Management
    static getAllSenderIds(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.getAllSenderIds(pageUrl, query);
        }
    }

    static updateSenderIdStatus(id: number, data: { status: string, rejection_reason?: string }): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.updateSenderIdStatus(id, data);
        }
    }

    // Messages Management
    static getAllMessages(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.getAllMessages(pageUrl, query);
        }
    }

    // SMS Users Management
    static getAllSmsUsers(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.getAllSmsUsers(pageUrl, query);
        }
    }

    static updateUserWalletStatus(userId: number, data: { status: string }): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.updateUserWalletStatus(userId, data);
        }
    }

    static addFundsToUser(userId: number, data: { amount: number, description?: string }): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.addFundsToUser(userId, data);
        }
    }

    // Campaigns Management
    static getAllCampaigns(pageUrl: string = '', query: any = {}): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.getAllCampaigns(pageUrl, query);
        }
    }

    // Platform Settings
    static getSmsSettings(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.getSmsSettings();
        }
    }

    static updateSmsSettings(data: {
        cost_per_segment: number,
        daily_limit_per_user: number,
        monthly_limit_per_user: number,
        minimum_wallet_balance: number,
        auto_approve_sender_ids: boolean
    }): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminSmsApi.updateSmsSettings(data);
        }
    }
}