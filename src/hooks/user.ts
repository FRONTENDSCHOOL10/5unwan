import { currentUser } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUserQuery() {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: currentUser,
  });

  return { user: query.data, ...query };
}