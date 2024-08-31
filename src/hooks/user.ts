import { currentUser, kakaoSignUpOrLogin } from "@/api/pocketbase";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCurrentUserQuery() {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: currentUser,
  });

  return { user: query.data, ...query };
}
