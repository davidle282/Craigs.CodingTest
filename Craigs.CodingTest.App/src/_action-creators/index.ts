import { ActionType, endpoint } from "../_interfaces/ref"
import { Dispatch } from "redux";
import { Action, Product, IProductDetails } from "../_interfaces/product";
import axios from "axios";

export const getProductList =  (callback: any) => async (dispatch: Dispatch<Action>) => {
    const res = await axios.get<Product[]>(`${endpoint}/products`);
    getProductListSussess(dispatch, res.data)
    if(callback){
        callback(res.data);
    }
    // return (dispatch: Dispatch<Action>) => {
    //     dispatch({
    //         type: ActionType.GET_PRODUCT_LIST,
    //         payload: res.data

    //     })
    // }
}

const getProductListSussess = (dispatch: Dispatch<Action>, data: Product[]) => {
    dispatch({
        type: ActionType.GET_PRODUCT_LIST,
        payload: data

    })
}

export const getProductDetails = async (id: any) => {
    const res = await axios.get<IProductDetails>(`${endpoint}/products/${id}`);
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_PRODUCT_DETAILS,
            payload: res.data,
        })
    }
}