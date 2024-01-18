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

    static getlinksByName(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getlinksByName(data);
        }
    }

    static getlinksDetails(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getlinksDetails(data);
        }
    }

    static getlinks(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getlinks();
        }
    }

    static makePayment(amount: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.makePayment(amount);
        }
    }

    static getCallback(reference:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getCallback(reference);
        }
    }

    static editLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.editLink(data);
        }
    }


    static createLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createLink(data);
        }
    }



    static createCatalog(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createCatalog(data);
        }
    }

    static deleteLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.deleteLink(data);
        }
    }



    static updateProfile(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.updateProfile(data);
        }
    }


    static searchName(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.searchName(data);
        }
    }




    static updatePassword(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.updatePassword(data);
        }
    }




    //Multi Links Api

    static getMultiLinks(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getMultiLinks();
        }
    }

    static createTieredLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createTieredLink(data);
        }
    }

    static updateTieredLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.updateTieredLink(data);
        }
    }


    static deleteMultiLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.deleteMultiLink(data);
        }
    }

    static getMultiLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getMultiLink(data);
        }
    }

    static getMultiLinkData(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getMultiLinkData(data);
        }
    }






    //Market Link Apis  

    static checkMarketLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.checkMarketLink(data);
        }
    }

    static createProduct(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createProduct(data);
        }
    }

    static updateProduct(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.updateProduct(data);
        }
    }

    static createMarketLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createMarketLink(data);
        }
    }

    static getMarketLink(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getMarketLink();
        }
    }

    static getAllStore(pageNo:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getAllStore(pageNo);
        }
    }

    static getSingleProduct(id: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getSingleProduct(id);
        }
    }

    static getSingleProductOutside(id: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getSingleProductOutside(id);
        }
    }

    static getProductByLinkName(id: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getProductByLinkName(id);
        }
    }

    static deleteProduct(id: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.deleteProduct(id);
        }
    }



    //Redirect Link    


    static createRedirectLink(data: any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.createRedirectLink(data);
        }
    }

    static getRedirectLinks(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.adminApi.getRedirectLinks();
        }
    }


}