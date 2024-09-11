import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { useToday, useWorkouts } from "@/hooks/useWorkouts";
import { useMemo, useState } from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Workout } from "@/api/pocketbaseWorkouts";
import { DayContent, DayContentProps, DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";

export default function Calendar() {
  const { user } = useOutletContext<UserContext>();
  const {
    now,
    currentMonthStart,
    setCurrentMonthStart,
    currentMonthEnd,
    setCurrentMonthEnd,
  } = useToday();
  const { workouts } = useWorkouts({
    startDay: currentMonthStart
      ? format(currentMonthStart, "yyyy-MM-dd")
      : "2024-08-01",
    endDay: currentMonthEnd
      ? format(currentMonthEnd, "yyyy-MM-dd")
      : "2024-08-31",
  });

  const workoutsByDay: Record<string, Workout[]> = workouts.reduce(
    (acc, val) => {
      acc[val.day] = acc[val.day] ?? [];
      acc[val.day].push(val);
      return acc;
    },
    {} as Record<string, Workout[]>
  );

  console.log(workoutsByDay);

  const [selectedDay, setSelectedDay] = useState<string | null>();

  const CustomDayContent: React.FC<DayContentProps> = useMemo(() => {
    const c = (props: DayContentProps) => {
      const dateTime = format(props.date, "yyyy-MM-dd");
      const dayWorkouts = workoutsByDay[dateTime] ?? [];
      return (
        <time
          dateTime={dateTime}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DayContent {...props} />
          {dayWorkouts.length > 0 ? (
            <button
              style={{ display: "contents" }}
              onClick={() => setSelectedDay(dateTime)}
            >
              : {dayWorkouts.length}
            </button>
          ) : null}
        </time>
      );
    };
    c.displayName = "CustomDayContent";
    return c;
  }, [workouts]);

  return (
    <div>
      <p>현재 사용자: {user?.nickname}</p>
      <br />
      <span>캘린더</span>

      <div style={{ padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "85%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <DayPicker
                captionLayout="dropdown"
                fromYear={2024}
                toYear={now?.getFullYear()}
                weekStartsOn={1}
                locale={ko}
                formatters={{
                  formatMonthCaption: (date: Date) => format(date, "MMM"),
                }}
                components={{ DayContent: CustomDayContent as any }}
                month={currentMonthStart}
                onMonthChange={(month) => {
                  setCurrentMonthStart(startOfMonth(month));
                  setCurrentMonthEnd(endOfMonth(month));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedDay && (
        <>
          {workoutsByDay[selectedDay].map((workout) => (
            <div key={workout.id}>
              <h2>{workout.title}</h2>
              <p>{workout.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
