import { Action, ProductState } from "../_interfaces/product";
import {
    ActionType
  } from "../_interfaces/ref";
const initialState: ProductState = {
    productList: [],
    productDetails: {
        productId: 0,
        productName: '',
        brandId: 0,
        categoryId: 0,
        modelYear: 0,
        listPrice: 0,
        brand:{
            brandId: 0,
            brandName: '',
        },
        category:{
            categoryId: 0,
            categoryName: '',
        },
        stocks:[]
    },
}

const productReducer = (state: ProductState = initialState, action: Action) => {
    switch(action.type){
        case ActionType.GET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload,
            };
        case ActionType.GET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload
            };
        default:
            return state
    }
}

export default productReducer;