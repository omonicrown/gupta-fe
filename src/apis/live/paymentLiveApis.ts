import { AxiosGlobal } from "../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../configs";
import { store } from "../../store/store";



export class PaymentLiveApis extends AxiosGlobal{
    
    payForProduct(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/payment/pay-for-product`, data);
    }

   


}