import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { logoutMutation, isPending, error };
};
