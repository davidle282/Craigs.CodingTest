import { ActionType, endpoint } from "../_interfaces/ref"
import { Dispatch } from "redux";
import { Action, Product, IProductDetails } from "../_interfaces/product";
import axios from "axios";

export const getProductList = async () => {
    const res = await axios.get<Product[]>(`${endpoint}/products`);
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.GET_PRODUCT_LIST,
            payload: res.data

        })
    }
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