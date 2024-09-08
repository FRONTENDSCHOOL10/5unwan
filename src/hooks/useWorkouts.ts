import {
  createWorkout,
  getWorkouts,
  subscribeToWorkouts,
  updateWorkout,
  Workout,
} from "@/api/pocketbaseWorkouts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { RecordModel, RecordSubscription } from "pocketbase";
import { useEffect, useState } from "react";

export function useToday() {
  const [{ today, now, todayMonthStart, todayMonthEnd }] = useState(() => {
    const now = new Date();
    return {
      now,
      today: format(now, "yyyy-MM-dd"),
      todayMonthStart: startOfMonth(now),
      todayMonthEnd: endOfMonth(now),
    };
  });

  const [currentMonthStart, setCurrentMonthStart] =
    useState<Date>(todayMonthStart);
  const [currentMonthEnd, setCurrentMonthEnd] = useState<Date>(todayMonthEnd);

  return {
    today,
    now,
    currentMonthStart,
    setCurrentMonthStart,
    currentMonthEnd,
    setCurrentMonthEnd,
  };
}

export function useWorkouts({
  startDay,
  endDay,
}: {
  startDay: string;
  endDay: string;
}) {
  const queryClient = useQueryClient();

  // https://tanstack.com/query/latest/docs/framework/react/guides/query-keys#array-keys-with-variables
  const queryKey = [
    "workouts",
    {
      startDay,
      endDay,
    },
  ];

  const query = useQuery({
    queryKey,
    // https://tanstack.com/query/latest/docs/framework/react/guides/query-keys#if-your-query-function-depends-on-a-variable-include-it-in-your-query-key
    queryFn: () => getWorkouts({ startDay, endDay }),
    // https://tkdodo.eu/blog/using-web-sockets-with-react-query#increasing-staletime
    staleTime: Infinity,
  });

  // https://tkdodo.eu/blog/using-web-sockets-with-react-query#partial-data-updates
  // async, await 못함.
  useEffect(() => {
    const callback: (data: RecordSubscription<RecordModel>) => void = (e) => {
      queryClient.setQueryData(queryKey, (prevWorkouts: Workout[]) => {
        // strictmode때문에 useEffect가 두 번씩 일어나는 현상 발생, 같은 record에서 create가 두 번 발생함. -> 따라서 e.action을 사용하지 않고 다른 방식으로 진행.
        // e.action은 생성인지 수정(업데이트)인지, 삭제인지 알려줌.

        // e.record를 수정한 경우(업데이트) 그 workout을 prevWorkouts에서 찾음.
        // e.record가 생성된 경우, 새로운 record기에 prevWorkouts에서 찾을 수 없음.
        const workoutIndex = prevWorkouts.findIndex((workout) => {
          return workout.id === e.record.id;
        });

        //  e.record를 수정한 경우(업데이트): 기존 workout을 수정된 버전으로 업데이트
        if (workoutIndex > -1) {
          const newWorkouts = [...prevWorkouts];
          newWorkouts[workoutIndex] = e.record as unknown as Workout;
          return newWorkouts;
        }

        // e.record가 생성된 경우: e.record를 맨 앞에 추가함.
        if (workoutIndex === -1) {
          const workout = e.record as unknown as Workout;
          if (workout.day >= startDay && workout.day <= endDay) {
            return [workout, ...prevWorkouts];
          }
        }
        return prevWorkouts;
      });
    };

    const unsubscribeFuncPromise = subscribeToWorkouts(callback);

    // cleanup: https://react.dev/reference/react/useEffect#connecting-to-an-external-system
    // return () => {
    //   unsubscribeFunc();
    // };
    return () => {
      // TODO: clean-up을 하기 위해 포켓베이스가 unsubscribe를 쓰면 된다고 해서, 그리고 몇개의 예시들을 찾아봤는데 많이들 쓰길래 일단 추가했습니다. 그러나 저는 unsubscribeFunc()를 바로 사용하고 싶은데, pocketbase가 제공하는 것이 unsubscribeFunc의 promise임.. 그래서 promise를 return하려고 했는데 안 돼서, .then을 쓰는 방식으로 구현을 일단 했는데, 왜 된건지 모르겠고... 그냥 잘 모르겠고... 다른 방식으로 할 수 있는지, 또는 이게 맞는지, 정답이 뭔지 모르겠습니다.
      unsubscribeFuncPromise.then((unsubscribeFunc) => {
        unsubscribeFunc();
      });
    };
  }, [queryClient]);

  const createMutation = useMutation({
    mutationFn: createWorkout,
  });

  const updateMutation = useMutation({
    mutationFn: updateWorkout,
  });

  return {
    workouts: query.data ?? [],
    ...query,
    createMutation,
    updateMutation,
  };
}
