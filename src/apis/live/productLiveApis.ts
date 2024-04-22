import { AxiosGlobal } from "../shared/axios";
import{ AxiosPromise} from "axios";
import configs from "../../configs";
import { store } from "../../store/store";



export class ProdutLiveApi extends AxiosGlobal{
    
    getAllProducts(pageNo:any,query:any): AxiosPromise<Array<any>> {
        return this.axios.get(`${configs.context}/market-links/get-market-products?page=${pageNo}&search=${query?.search}&location=${query?.name}&categories=${query?.categories}`,{
            headers: { "Content-Type": "aplication/json","Accept":"aplication/json","Authorization":`Bearer ${store.getState().data.login.value.token}`,"Access-Control-Allow-Origin":"*" },
          });
    }

    

}