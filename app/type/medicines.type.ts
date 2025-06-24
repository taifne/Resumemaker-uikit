import { Supplier } from "./supplier.type";

export interface Medicine {
    _id: string;
    name: string;
    manufacturer?: string;
    expiryDate?: string; // Can be a Date if parsed
    dosage?: string;
    price: number;
    quantityInStock: number;
    packSize?: number;
    sideEffects?: string[]; // Added missing property
    prescriptionRequired?: boolean; // Added missing property
    supplier?: Supplier; // Changed to a proper Supplier type
}
export interface Category {
    _id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateCategoryDto {
    name: string;
    description?: string;
  }
  