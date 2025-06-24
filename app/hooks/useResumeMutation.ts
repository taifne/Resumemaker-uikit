import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import axios from 'axios';
import { Resume, CreateResumeDto, UpdateResumeDto } from '../type/resume.type';

// Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Fetch all resumes
const fetchAllResumes = async (userId: string): Promise<Resume[]> => {
  const response = await axios.get<Resume[]>(`${API_URL}/resumes`, {
    params: { userId },
  });
  return response.data;
};

// React Query hook to fetch all resumes
export function useAllResumes(userId: string) {
  return useQuery<Resume[], unknown>({
    queryKey: ['resumes', userId],
    queryFn: () => fetchAllResumes(userId),
    enabled: !!userId,  // ensure we don't call without userId
  });
}

// Create a new resume
export function useCreateResume() {
  const queryClient = useQueryClient();

  return useMutation(
    async (newResume: CreateResumeDto) => {
      const response = await axios.post<Resume>(`${API_URL}/resumes`, newResume);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['resumes']);
      },
    }
  );
}

// Update an existing resume
export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, data }: { id: string; data: UpdateResumeDto }) => {
      const response = await axios.put<Resume>(`${API_URL}/resumes/${id}`, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['resumes']);
      },
    }
  );
}

// Delete a resume
export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      await axios.delete(`${API_URL}/resumes/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['resumes']);
      },
    }
  );
}

// Fetch a single resume lazily
const fetchResumeById = async (id: string): Promise<Resume> => {
  const response = await axios.get<Resume>(`${API_URL}/resumes/${id}`);
  return response.data;
};

export function useLazyResume(id: string): UseQueryResult<Resume, unknown> {
  return useQuery<Resume, unknown>({
    queryKey: ['resume', id],
    queryFn: () => fetchResumeById(id),
    enabled: false, // lazy — use refetch() when needed
  });
}
