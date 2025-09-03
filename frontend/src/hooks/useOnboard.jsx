import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { onboard } from "../lib/api";
import toast from "react-hot-toast";

export const useOnboard = () => {
  const queryClient = useQueryClient();

  const {
    mutate: onboardingMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: onboard,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { onboardingMutation, isPending, error };
};
