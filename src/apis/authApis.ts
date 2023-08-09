import { AxiosPromise } from "axios";
import configs from "../configs";

import { AuthLiveApis } from "./live/authLiveApis";



export class AuthApis {
    private static authApis: AuthLiveApis = new AuthLiveApis();

    // static getAllHouses(pageNo:any): AxiosPromise<Array<any>> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authApis.getAllHouses(pageNo);
    //     }
    // }
    
    // static getAllUsers(pageNo:any): AxiosPromise<Array<any>> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authApis.getAllUsers(pageNo);
    //     }
    // } 
    
    

    static login(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authApis.loginUser(data);
        }
    }  

    static createRandomLink(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authApis.createRandomLink(data);
        }
    }  

    static register(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authApis.registerUser(data);
        }
    }

    static forgotPassword(data: any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.authApis.forgotPassword(data);
        }
    }


}