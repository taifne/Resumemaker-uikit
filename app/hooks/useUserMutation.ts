import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { User, CreateUserDto, UpdateUserDto, UpdateUserRoleDto } from '../type/user-role.type';


const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useLazyUsers = (filters: {
  username?: string;
  email?: string;
  role?: string;
}) => {
  const queryString = new URLSearchParams(filters).toString();
  console.log(queryString);
  return useQuery<User[]>({
    queryKey: ['users', filters],
    queryFn: async () => {
      const res = await axios.get(`${API}/users/search?${queryString}`);
      return res.data;
    },
    enabled: false, 
  });
};

export const useAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get(`${API}/users`);
      return res.data;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await axios.get(`${API}/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserDto) => axios.post(`${API}/users`, data),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      axios.put(`${API}/users/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`${API}/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      roleId,
    }: {
      userId: string;
      roleId: string;
    }) =>
      axios.patch(`${API}/users/${userId}/role`, {
        roleId,
      } as UpdateUserRoleDto),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });
};

export const useDeleteUsersBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userIds: string[]) =>
      axios.delete(`${API}/users/bulk`, {
        data: { userIds },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
};
