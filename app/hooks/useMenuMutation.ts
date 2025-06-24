// hooks/useMenus.ts
import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import axios from 'axios';
import { Menu } from '../type/menu.type';


// Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Fetch all menus
const fetchAllMenus = async (): Promise<Menu[]> => {
  const response = await axios.get<Menu[]>(`${API_URL}/menus`);
  return response.data;
};

// React Query hook to fetch all menus
export function useAllMenus(): UseQueryResult<Menu[], unknown> {
  return useQuery<Menu[], unknown>({
    queryKey: ['menus'],
    queryFn: fetchAllMenus,
    enabled: true,
  });
}


export function useDeleteMenu() {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (id: string) => {
        await axios.delete(`${API_URL}/menus/${id}`);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['menus']);
        },
      }
    );
  }
  
  // Create a new menu
export function useCreateMenu() {
    const queryClient = useQueryClient();
  
    return useMutation(
      async (newMenu: Partial<Menu>) => {
        const response = await axios.post<Menu>(`${API_URL}/menus`, newMenu);
        return response.data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['menus']);
        },
      }
    );
  }
  
// Lazy fetch (with filter support if needed)
const fetchFilteredMenus = async (filters: Record<string, string> = {}): Promise<Menu[]> => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await axios.get<Menu[]>(`${API_URL}/menus/search?${queryString}`);
  return response.data;
};

export function useLazyMenus(filters: Record<string, string>): UseQueryResult<Menu[], unknown> {
  return useQuery<Menu[], unknown>({
    queryKey: ['menus', filters],
    queryFn: () => fetchFilteredMenus(filters),
    enabled: false, // Lazy query — call `refetch()` when you want to run it
  });
}
