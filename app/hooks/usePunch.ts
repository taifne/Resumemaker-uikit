// src/hooks/usePunch.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Punch } from '../type/punch.type';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const useAllPunchesForUser = (userId: string) => {
  return useQuery<Punch[]>({
    queryKey: ['punches', userId],
    queryFn: async () => {
      const res = await axios.get(`${API}/punch/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });
};

export const useCreatePunch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      axios.post(`${API}/punch/${userId}`),
    onSuccess: (_res, userId) => {
      queryClient.invalidateQueries(['punches', userId]);
    },
  });
};


type UserWorkingTime = {
  user: {
    _id: string;
    username: string;
    email: string;
  };
  totalWorkingTime: number; // milliseconds
};

export const useMonthlyWorkingTimes = (month: string) => {
  return useQuery<UserWorkingTime[]>({
    queryKey: ['working-times', month],
    queryFn: async () => {
      const res = await axios.get(`${API}/punch/working-times?month=${month}`);
      return res.data;
    },
    enabled: !!month,
    staleTime: 5 * 60 * 1000,
  });
};

// NEW hook to get total working time for one user by month
export const useTotalWorkingTimeByMonth = (userId: string, month: string) => {
  return useQuery<number>(
    ['totalWorkingTime', userId, month],
    async () => {
      if (!userId || !month) return 0;

      const res = await axios.get<{ totalWorkingTimeMs: number }>(
        `${API}/punch/working-time/${userId}?month=${month}`
      );
      return res.data.totalWorkingTimeMs;
    },
    {
      enabled: !!userId && !!month,
      staleTime: 5 * 60 * 1000,
    }
  );
};

type PunchSummary = {
  totalDays: number;
  missingPunches: number;
  lateArrivals: number;
  earlyLeaves: number;
};

export const usePunchSummaryByMonth = (userId: string, month: string) => {
  return useQuery<PunchSummary>(
    ['punchSummary', userId, month],
    async () => {
      const res = await axios.get(`${API}/punch/summary/${userId}?month=${month}`);
      return res.data;
    },
    {
      enabled: !!userId && !!month,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useTotalWorkingHours = (userId: string, month: string) => {
  return useQuery<{ userId: string; month: string; totalHours: number }>({
    queryKey: ['totalWorkingHours', userId, month],
    queryFn: async () => {
      const res = await axios.get(`${API}/punch/${userId}/working-hours`, {
        params: { month },
      });
      return res.data;
    },
    enabled: !!userId && !!month,
  });
};