// import { useOutletContext } from "react-router-dom";
// import { UserContext } from "@/routes/PrivateRoute";
import { useToday, useWorkouts } from "@/hooks/useWorkouts";
import React, { useMemo, useState } from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Workout } from "@/api/pocketbaseWorkouts";
import {
  DayContent,
  DayContentProps,
  DayPicker,
  CaptionProps,
  useNavigation,
} from "react-day-picker";
import { ko } from "date-fns/locale";
import styles from "./calendar.module.css";

export default function Calendar() {
  // const { user } = useOutletContext<UserContext>();
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
      // eslint-disable-next-line react/prop-types
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
  }, [workoutsByDay]);

  const progressPerMonth = Math.round(
    (Object.keys(workoutsByDay).length / currentMonthEnd.getDate()) * 100
  );

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} body-xl-bold`}>
        운동기록과
        <br />
        출석률을 확인해보세요.
      </h1>
      <div role="group" className={styles["attendance-container"]}>
        <span className="heading-6">
          {progressPerMonth}%{" "}
          <span className={`${styles.attendance} heading-6`}>출석중</span>
        </span>
        <div className={styles["progress-container"]}>
          <div
            className={styles["progress-bar"]}
            style={{ width: `${progressPerMonth}%` }}
          ></div>
        </div>
      </div>
      <DayPicker
        className={styles.calendar}
        // captionLayout="dropdown"
        fromYear={2024}
        toYear={now?.getFullYear()}
        weekStartsOn={1}
        locale={ko}
        formatters={{
          // formatMonthCaption: (date: Date) => format(date, "MMM"),
          formatWeekdayName: (date: Date, options) => {
            return <span>{format(date, "EEE", options)}</span>;
          },
        }}
        components={{
          Caption: CustomCaptionComponent,

          DayContent: CustomDayContent as
            | ((props: DayContentProps) => JSX.Element | null)
            | undefined,
        }}
        month={currentMonthStart}
        onMonthChange={(month) => {
          setCurrentMonthStart(startOfMonth(month));
          setCurrentMonthEnd(endOfMonth(month));
        }}
      />

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

export function CustomCaptionComponent(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <h2 style={{ display: "flex", justifyContent: "space-between" }}>
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        Previous
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{format(props.displayMonth, "M")}</span>
        <span>{format(props.displayMonth, "yyyy")}</span>
      </div>

      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        Next
      </button>
    </h2>
  );
}
