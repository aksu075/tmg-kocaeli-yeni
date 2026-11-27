import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { announcementsApi } from "@/lib/api";

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      try {
        return await announcementsApi.getAll();
      } catch {
        return [];
      }
    },
    initialData: [],
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => announcementsApi.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });
};

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      announcementsApi.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });
};

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsApi.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["announcements"] }),
  });
};
