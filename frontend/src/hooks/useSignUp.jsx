import { useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => toast.error(error.response.data.message),
  });

  return { signupMutation, isPending, error };
};
