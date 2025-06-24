import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import axios from 'axios';

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
export interface medicineCreateDto {
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
    supplier?: string; // Changed to a proper Supplier type
}


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


const fetchAllMedicines = async (): Promise<Medicine[]> => {
    const response = await axios.get<Medicine[]>(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/medicines`
    );
    return response.data;
};

export function useAllMedicines(): UseQueryResult<Medicine[], unknown> {
    return useQuery<Medicine[], unknown>({
        queryKey: ['medicines'],
        queryFn: fetchAllMedicines,
        enabled: true,
    });
}

const fetchFilteredMedicines = async (filters: Record<string, string> = {}): Promise<Medicine[]> => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await axios.get<Medicine[]>(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/medicines/search?${queryString}`
    );
    return response.data;
};

export function useLazyMedicines(filters: Record<string, string>): UseQueryResult<Medicine[], unknown> {
    return useQuery<Medicine[], unknown>({
        queryKey: ['medicines', filters],
        queryFn: () => fetchFilteredMedicines(filters),
        enabled: false, // Lazy query; call refetch() when needed
    });
}

export function useCreateMedicine() {
    const queryClient = useQueryClient();

    return useMutation(
        (newMedicine: Partial<medicineCreateDto>) =>
            axios.post<medicineCreateDto>(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/medicines`, newMedicine),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['medicines']);
            },
        }
    );
}

export function useUpdateMedicine() {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, updates }: { id: string; updates: Partial<Medicine> }) =>
            axios.patch<Medicine>(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/medicines/${id}`,
                updates
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['medicines']);
            },
        }
    );
}
export function useDeleteMedicine() {
    const queryClient = useQueryClient();

    return useMutation(
        (id: string) =>
            axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/medicines/${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['medicines']);
            },
        }
    );
}

export function useDeleteManyMedicines() {
    const queryClient = useQueryClient();

    return useMutation(
        (ids: string[]) =>
            axios.delete(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/medicines`, {
                data: { ids }, // `axios.delete` requires `data` to be set like this
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['medicines']);
            },
        }
    );
}
