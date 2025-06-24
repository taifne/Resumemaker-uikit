// hooks/useSuppliers.ts
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import axios from 'axios';
import { CreateSupplierDto, UpdateSupplierDto } from '../type/supplier.type';
import { Supplier } from './useLazyMedicines';

// Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Fetch all suppliers
const fetchAllSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get<Supplier[]>(`${API_URL}/suppliers`);
  return response.data;
};

// React Query hook to fetch all suppliers
export function useAllSuppliers(): UseQueryResult<Supplier[], unknown> {
  return useQuery<Supplier[], unknown>({
    queryKey: ['suppliers'],
    queryFn: fetchAllSuppliers,
    enabled: true,
  });
}

// Create a new supplier
export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation(
    async (newSupplier: CreateSupplierDto) => {
      const response = await axios.post<Supplier>(`${API_URL}/suppliers`, newSupplier);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suppliers']);
      },
    }
  );
}

// Update an existing supplier
export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, data }: { id: string; data: UpdateSupplierDto }) => {
      const response = await axios.patch<Supplier>(`${API_URL}/suppliers/${id}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suppliers']);
      },
    }
  );
}

// Delete a supplier
export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await axios.delete(`${API_URL}/suppliers/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suppliers']);
      },
    }
  );
}

// Fetch a single supplier lazily
const fetchSupplierById = async (id: string): Promise<Supplier> => {
  const response = await axios.get<Supplier>(`${API_URL}/suppliers/${id}`);
  return response.data;
};

export function useLazySupplier(id: string): UseQueryResult<Supplier, unknown> {
  return useQuery<Supplier, unknown>({
    queryKey: ['supplier', id],
    queryFn: () => fetchSupplierById(id),
    enabled: false, // lazy — call refetch() when needed
  });
}
