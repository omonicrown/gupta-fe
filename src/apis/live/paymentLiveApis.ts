import { AxiosGlobal } from "../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../configs";
import { store } from "../../store/store";



export class PaymentLiveApis extends AxiosGlobal{
    
    payForProduct(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/payment/pay-for-product`, data);
    }

    witdrawFunds(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/payment/pay-to-customer`, data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }

    getProdutCallback(reference: any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/product-payment-callback?reference=${reference}`, {
            headers: { "Content-Type": "aplication/json", 'mode': 'no-cors', "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }  
    

    getWalletDetails(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/payment/get-wallet-details`, {
            headers: { "Content-Type": "aplication/json", 'mode': 'no-cors', "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    } 
    
    getTransactions(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/payment/get-transations`, {
            headers: { "Content-Type": "aplication/json", 'mode': 'no-cors', "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    } 
   


}