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

    createRandomUrl(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/link/create-random-url`, data);
    }

    verifyMail(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/auth/verify-mail`, data);
    }


    registerUser(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/auth/register`, data);
    }

    forgotPassword(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/auth/forgot`, data);
    }

    resetPassword(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/auth/reset`, data);
    }

    logout(data: any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/logout`, data, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }
    
   


}