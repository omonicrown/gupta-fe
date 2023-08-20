import { AxiosPromise } from "axios";
import configs from "../configs";
import { AdinLiveApis } from "./live/adminLiveApi";



export class AdminApis {
    private static adminApi: AdinLiveApis = new AdinLiveApis();   
    
    static getAllLinks(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getAllLinks();
        }
    } 

    static getlinks(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getlinks();
        }
    }

    static getMultiLink(data:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getMultiLink(data);
        }
    }
   

    static editLink(data:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.editLink(data);
        }
    } 


    static createLink(data:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createLink(data);
        }
    }

    static createCatalog(data:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createCatalog(data);   
        }
    } 

    static deleteLink(data:any): AxiosPromise<Array<any>> {  
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.deleteLink(data);   
        }
    }

    static deleteMultiLink(data:any): AxiosPromise<Array<any>> {  
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.deleteMultiLink(data);   
        }
    }


    static updateProfile(data:any): AxiosPromise<Array<any>> {  
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.updateProfile(data);  
        }
    }


    static searchName(data:any): AxiosPromise<Array<any>> {  
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.searchName(data);
        }
    }


    static createTieredLink(data:any): AxiosPromise<Array<any>> {  
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createTieredLink(data);
        }
    }
    

    static updatePassword(data:any): AxiosPromise<Array<any>> {    
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.updatePassword(data);
        }
    }
    

   

    
    


}