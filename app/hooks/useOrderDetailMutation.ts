import { useQuery, useMutation, useQueryClient, UseQueryResult } from 'react-query';
import axios from 'axios';
import { CreateOrderItemDto, OrderDetail } from '../type/order-detail.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// --- Fetch all order details ---
const fetchAllOrderDetails = async (): Promise<OrderDetail[]> => {
  const res = await axios.get<OrderDetail[]>(`${API_URL}/order-details`);
  return res.data;
};

export function useAllOrderDetails(
  enabled: boolean = true,
): UseQueryResult<OrderDetail[], unknown> {
  return useQuery<OrderDetail[], unknown>({
    queryKey: ['order-details'],
    queryFn: fetchAllOrderDetails,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

// --- Fetch by ID ---
const fetchOrderDetailById = async (id: string): Promise<OrderDetail> => {
  const res = await axios.get<OrderDetail>(`${API_URL}/order-details/${id}`);
  return res.data;
};

export function useOrderDetail(id: string|null): UseQueryResult<OrderDetail, unknown> {
  return useQuery<OrderDetail, unknown>({
    queryKey: ['order-detail', id],
    queryFn: () => fetchOrderDetailById(id!),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

// --- Create new order detail ---
export function useCreateOrderDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateOrderItemDto) => {
      const res = await axios.post<OrderDetail>(`${API_URL}/order-details`, dto);
      return res.data;
    },
    onSuccess: () => {
      // Optionally refetch the list
      queryClient.invalidateQueries(['order-details']);
    },
  });
}
export function useDeleteOrderDetail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderKey, orderDetailId }: { orderKey: string; orderDetailId: string }) => {
      await axios.delete(`${API_URL}/order-details/${orderKey}/${orderDetailId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['order-details']);
    },
  });
}