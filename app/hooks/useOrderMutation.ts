import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { CreateOrderDto, Order, OrderDetail } from '../type/order-detail.type';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


export const useOrderDetailsByOrderKey = (orderKey: string) => {
  return useQuery<OrderDetail[]>({
    queryKey: ['order-details', orderKey],
    queryFn: async () => {
      const res = await axios.get(`${API}/orders/details/${orderKey}`);
      return res.data;
    },
    enabled: !!orderKey, // Only run the query if the orderKey is provided
  });
}
export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axios.get(`${API}/orders`);
      return res.data;
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery<Order>({
    queryKey: ['orders', id],
    queryFn: async () => {
      const res = await axios.get(`${API}/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderDto) => axios.post(`${API}/orders`, data),
    onSuccess: () => queryClient.invalidateQueries(['orders']),
  });
};
export const useDeleteOrderById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API}/orders/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['orders']),
  });
};

//month
export const useMonthlyRevenue = (year: number) => {
  return useQuery({
    queryKey: ['monthly-revenue', year],
    queryFn: async () => {
      const res = await axios.get(`${API}/orders/reports/revenue/${year}`);
      return res.data;
    },
    enabled: !!year,
  });
};

// 2. Top medicines per month
export const useTopMedicinesPerMonth = (year: number) => {
  return useQuery({
    queryKey: ['top-medicines-monthly', year],
    queryFn: async () => {
      const res = await axios.get(`${API}/orders/reports/top-medicines/monthly/${year}`);
      return res.data;
    },
    enabled: !!year,
  });
};

// 3. Top medicines per year
export const useTopMedicinesPerYear = (year: number) => {
  return useQuery({
    queryKey: ['top-medicines-yearly', year],
    queryFn: async () => {
      const res = await axios.get(`${API}/orders/reports/top-medicines/yearly/${year}`);
      return res.data;
    },
    enabled: !!year,
  });
};

export const useConfirmOrderStatus = (status:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderKey: string) =>
      axios.patch(`${API}/orders/${orderKey}/status`, { status: status}),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
  });
};
export const useUserOrderStatsForMonth = (userId: string, month: string) => {
  return useQuery(
    ['order-stats', userId, month],
    async () => {
      const res = await axios.get(`${API}/orders/stats/${userId}/${month}`);
      return res.data; // expected { totalOrders: number; totalAmount: number }
    },
    {
      enabled: !!userId && !!month,
    }
  );
};
// Medicine sales by month
export const useMedicineSalesInMonth = (month: string) => {
  return useQuery(
    ['medicine-sales-month', month],
    async () => {
      const res = await axios.get(`${API}/orders/reports/medicine-sales/${month}`);
      return res.data; // expected: [{ name: string, quantity: number }]
    },
    {
      enabled: !!month,
    }
  );
};
