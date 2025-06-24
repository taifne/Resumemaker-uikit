export interface Supplier {
    _id: string;
    name: string;
    contactInfo?: string;
    address?: string;
    email?: string;
    taxId?: string;
    country?: string;
    paymentTerms?: string;
    isActive?: boolean;
    phoneNumber?: string;
    representativeName?: string;
    contractStartDate?: string;
}
// types/supplier.dto.ts

export interface CreateSupplierDto {
  name: string;
  contactInfo?: string;
  address?: string;
  email?: string;
  taxId?: string;
  country?: string;
  paymentTerms?: string;
  isActive?: boolean;
  phoneNumber?: string;
  representativeName?: string;
  contractStartDate?: string; // ISO date string
}

export interface UpdateSupplierDto {
  name?: string;
  contactInfo?: string;
  address?: string;
  email?: string;
  taxId?: string;
  country?: string;
  paymentTerms?: string;
  isActive?: boolean;
  phoneNumber?: string;
  representativeName?: string;
  contractStartDate?: string; // ISO date string
}
