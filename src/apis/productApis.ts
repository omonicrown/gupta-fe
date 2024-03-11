import { AxiosPromise } from "axios";
import configs from "../configs";
import { ProdutLiveApi } from "./live/productLiveApis";



export class ProductApis {
    private static productApis: ProdutLiveApi = new ProdutLiveApi();

    static getAllProducts(pageNo:any,query:any): AxiosPromise<any> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.productApis.getAllProducts(pageNo,query);
        }
    } 


}