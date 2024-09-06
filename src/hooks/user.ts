import {
  getCurrentUser,
  logout,
  refreshCurrentUser,
  subscribeToCurrentUser,
  updateCurrentUser,
} from "@/api/pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const currentUserQueryKey = ["current-user"];

export function useCurrentUser() {
  const query = useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    // https://tkdodo.eu/blog/using-web-sockets-with-react-query#increasing-staletime
    staleTime: Infinity,
  });

  // pocketbase가 자동으로 pb.authStore.model을 변경함(업데이트) -> pb.authStore.onChange 콜백 실행
  const updateMutation = useMutation({
    mutationFn: updateCurrentUser,
  });

  return { ...query, user: query.data, logout, updateMutation };
}

// https://dev.to/franciscomendes10866/how-to-use-pocketbase-authentication-with-react-context-11be
// https://github.com/FranciscoMendes10866/pocketbase-auth-example/blob/main/src/contexts/PocketContext.jsx
// 한 번만 실행 -> SharedLayout에 넣는 게 가징 합리적임.
export function useSetupPocketBaseUser() {
  const queryClient = useQueryClient();

  // pb.authStore.model 업데이트 또는 로그아웃 시 subscribe
  useEffect(() => {
    const unsubscribe = subscribeToCurrentUser((_token, currentUser) => {
      if (currentUser) {
        queryClient.setQueryData(currentUserQueryKey, () => {
          return currentUser;
        });
      } else {
        // 로그아웃 후, queryClient 캐시를 클리어
        queryClient.clear();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  // 한번만 실행 -> refreshUser
  useEffect(() => {
    refreshCurrentUser();
  }, []);
}
