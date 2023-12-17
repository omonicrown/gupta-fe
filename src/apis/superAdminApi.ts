import { AxiosPromise } from "axios";
import configs from "../configs";
import { AdinLiveApis } from "./live/adminLiveApi";
import { SuperAdminLiveApi } from "./live/superAdminLiveApi";



export class SuperAdminApis {
    private static adminApi: SuperAdminLiveApi = new SuperAdminLiveApi();

    static getlinksCount(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getlinksCount();
        }
    } 


    static getAllUsers(pageNo:any,query:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getAllUsers(pageNo,query);
        }
    }

    static getsingleUserData(id:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getsingleUserData(id);
        }
    }

    

    

}