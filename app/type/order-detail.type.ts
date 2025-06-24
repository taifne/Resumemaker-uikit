import { Medicine } from "./medicines.type";

export interface OrderDetail {
  _id: string;
  medicine: Medicine | string; // populated or just ObjectId
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt:string;
  action:string;
     
}
export interface CreateOrderItemDto {
  orderKey:string;
    medicine: string; // medicine _id
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  export interface CreateOrderDto {
    customerName: string;
    customerPhone?: string;
    customerAddress?: string;
    status?: string;
    totalAmount: number;
    items: CreateOrderItemDto[];
     createdBy: string;
  }
  
  export interface Order {
    _id: string;
    customerName: string;
    customerPhone?: string;
    customerAddress?: string;
    status: string;
    totalAmount: number;
    orderDetails: {
      _id: string;
      medicine: {
        _id: string;
        name: string;
        // optionally more fields from medicine schema
      };
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }[];
    createAt:string;
    orderKey:string;
  }
  