import { AxiosGlobal } from "../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../configs";
import { store } from "../../store/store";



export class AuthLiveApis extends AxiosGlobal{
    
    loginUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/auth/login`, data);
    }

    createRandomLink(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/link/create-random-link`, data);
    }


    registerUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/auth/register`, data);
    }

    forgotPassword(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/forgot`, data);
    }
    
   


}