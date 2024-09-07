import { getExercises } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useExercisesQueryKey = ["exercises"];

export function useExercisesQuery() {
  const query = useQuery({
    queryKey: useExercisesQueryKey,
    queryFn: getExercises,
  });

  return { ...query, exercises: query.data };
}
