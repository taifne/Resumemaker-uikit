import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Category, CreateCategoryDto } from '../type/medicines.type';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${API}/categories`);
      return res.data;
    },
  });
};

export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ['categories', id],
    queryFn: async () => {
      const res = await axios.get(`${API}/categories/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};


export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryDto) => axios.post(`${API}/categories`, data),
    onSuccess: () => queryClient.invalidateQueries(['categories']),
  });
};
