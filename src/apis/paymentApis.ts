import { AxiosPromise } from "axios";
import configs from "../configs";

import { AuthLiveApis } from "./live/authLiveApis";
import { PaymentLiveApis } from "./live/paymentLiveApis";



export class PaymentApis {
    private static paymentApis: PaymentLiveApis = new PaymentLiveApis();

    // static getAllHouses(pageNo:any): AxiosPromise<Array<any>> {
    //     if (configs.type === "LOCAL") {
    //         return {} as AxiosPromise;
    //     } else {
    //         return this.authApis.getAllHouses(pageNo);
    //     }
    // }

    
    
    static payForProduct(pageNo:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.paymentApis.payForProduct(pageNo);
        }
    } 

    

    static getProdutCallback(reference:any): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.paymentApis.getProdutCallback(reference);
        }
    } 

    static getWalletDetails(): AxiosPromise<Array<any>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.paymentApis.getWalletDetails();
        }
    } 

   
}