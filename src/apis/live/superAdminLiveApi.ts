import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import configs from "../../configs";
import { store } from "../../store/store";



export class SuperAdminLiveApi extends AxiosGlobal {


    getlinksCount(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/admin/get-links-count`, {
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    } 

   

    payOutCustomers(data:any): AxiosPromise<any> {
        return this.axios.post(`${configs.context}/admin/pay-out-customers`, data,{
            headers: { "Content-Type": "aplication/json", "Accept": "aplication/json", "Authorization": `Bearer ${store.getState().data.login.value.token}`, "Access-Control-Allow-Origin": "*" },
        });
    }




    getAllUsers(pageNo:any,query:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/admin/get-all-users?page=${pageNo}&search=${query?.search}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getAllWitdrawals(pageNo:any,query:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/admin/get-all-witdrawals?page=${pageNo}&search=${query?.search}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }


    getsingleUserData(id:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/admin/get-single-user/${id}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }
   

}