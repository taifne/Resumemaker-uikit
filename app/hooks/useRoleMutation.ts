import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Role, CreateRoleDto } from '../type/user-role.type';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useAllRoles = () => {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      const res = await axios.get(`${API}/roles`);
      return res.data;
    },
  });
};

export const useRole = (id: string) => {
  return useQuery<Role>({
    queryKey: ['roles', id],
    queryFn: async () => {
      const res = await axios.get(`${API}/roles/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) => axios.post(`${API}/roles`, data),
    onSuccess: () => queryClient.invalidateQueries(['roles']),
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API}/roles/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['roles']),
  });
};

export const useUpdateMenusInRole = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        roleId,
        menuIds,
      }: {
        roleId: string;
        menuIds: string[];
      }) =>
        axios.patch(`${API}/roles/${roleId}/menus`, {
          menuIds,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(['roles']);
      },
    });
  };
  
