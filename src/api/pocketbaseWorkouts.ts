import { getPb } from "@/api/pocketbase";
import { RecordModel, RecordSubscription } from "pocketbase";

export type Workout = {
  id: string;
  collectionId: string;
  user: string;
  day: string;
  category: string;
  start: string;
  end: string;
  title: string;
  content: string;
  photo: string;
};

export type NewWorkout = {
  user: string;
  day: string;
  category: string;
  start: string;
  end: string;
  title: string;
  content: string;
  photo?: File;
};

export type UpdateWorkout = {
  day?: string;
  category?: string;
  start?: string;
  end?: string;
  title?: string;
  content?: string;
  photo?: File;
};

export async function getWorkouts({
  startDay,
  endDay,
}: {
  startDay: string;
  endDay: string;
}) {
  const pb = getPb();
  const records = await pb.collection("workouts").getFullList({
    sort: "-created",
    filter: `day >= "${startDay}" && day <= "${endDay}"`,
  });
  return records as unknown as Workout[];
}

export async function createWorkout(newWorkout: NewWorkout) {
  const pb = getPb();
  return (await pb.collection("workouts").create(newWorkout)) as Workout;
}

export async function updateWorkout({
  workoutId,
  workoutValues,
}: {
  workoutId: string;
  workoutValues: UpdateWorkout;
}) {
  const pb = getPb();
  return (await pb
    .collection("workouts")
    .update(workoutId, workoutValues)) as Workout;
}

export async function subscribeToWorkouts(
  callback: (data: RecordSubscription<RecordModel>) => void
) {
  const pb = getPb();
  return await pb.collection("workouts").subscribe("*", callback);
}
