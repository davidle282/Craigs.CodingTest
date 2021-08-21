import {
  ActionType
} from "./ref";

export interface Product {
  productId: number;
  productName: string;
  brandId: number;
  categoryId: number;
  modelYear: number;
  listPrice: number;
  brand: IBrand;
  category: ICategory;
}

export interface IProductDetails {
  productId: number;
  productName: string;
  brandId: number;
  categoryId: number;
  modelYear: number;
  listPrice: number;
  brand: IBrand;
  category: ICategory;
  stocks: IStock[];
}

export interface IBrand{
  brandId: number,
  brandName: string,
}

export interface ICategory {
  categoryId: number,
  categoryName: string,
}

export interface IStock {
  storeId: number,
  quantity: number,
  store: IStore
}

export interface IStore {
  storeId: number,
  storeName: string,
  phone: string,
  email: string,
  street: string,
  city: string,
  state: string,
  zipCode: string,
}

export interface ProductState {
  productList : Product[],
  productDetails: IProductDetails
}

interface GetProductList {
  type: ActionType.GET_PRODUCT_LIST,
  payload: Product[],
}

interface GetProductDetails {
  type: ActionType.GET_PRODUCT_DETAILS,
  payload: IProductDetails,
}

export type Action = GetProductList | GetProductDetails;