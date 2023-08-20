import { AxiosGlobal } from "../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../configs";
import { store } from "../../store/store";



export class AdinLiveApis extends AxiosGlobal{

    createLink(data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/links/add-info`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    createCatalog(data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/links/catalog`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    } 
    
    getAllLinks(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/session`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getlinks(): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/getlinks`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    editLink(data:any): AxiosPromise<Array<any>> {
        return this.axios.put(`${configs.context}/links/update-link-info/${data?.id}`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    deleteLink(data:any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.context}/links/delete/${data}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    } 

    deleteMultiLink(data:any): AxiosPromise<Array<any>> {
        return this.axios.delete(`${configs.context}/links/delete-tiered-link/${data}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    getMultiLink(data:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/links/get-tiered-links/${data}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    updateProfile(data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/profile/update`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    searchName(data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/links/search`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    createTieredLink(data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/links/tiered`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    updatePassword(data:any): AxiosPromise<Array<any>> {
        return this.axios.post(`${configs.context}/profile/password`,data,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

   


}