import { useToday, useWorkouts } from "@/hooks/useWorkouts";
import React, { useMemo, useState } from "react";
import { endOfMonth, format, getDay, startOfMonth } from "date-fns";
import { Workout } from "@/api/pocketbaseWorkouts";
import {
  DayContent,
  DayContentProps,
  DayPicker,
  CaptionProps,
  useNavigation,
} from "react-day-picker";
import { ko } from "date-fns/locale";
import { getPbImageUrl } from "@/api/pocketbase";
import SVGIcon from "@/components/SVGicon";
import styles from "./calendar.module.css";

export default function Calendar() {
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
      const date = props.date;
      const dateTime = format(date, "yyyy-MM-dd");
      const dayWorkouts = workoutsByDay[dateTime] ?? [];
      const isThisMonth = date.getMonth() === currentMonthStart.getMonth();

      return (
        <div role="group" className={styles["day-group"]}>
          <button
            className={
              selectedDay === dateTime
                ? styles["day-btn-selected"]
                : styles["day-btn"]
            }
            onClick={() => setSelectedDay(dateTime)}
            disabled={dayWorkouts.length === 0 || !isThisMonth}
          >
            <time
              className={`${isThisMonth ? styles.day : styles["day-disabled"]}`}
              dateTime={dateTime}
            >
              <DayContent {...props} />
            </time>
          </button>
          <div
            style={{
              display: "flex",
              marginTop: "4px",
              justifyContent: "center",
            }}
          >
            {dayWorkouts.map((workout) => (
              <div key={workout.id} style={{ margin: "0px 2px" }}>
                <SVGIcon iconId="iconEllipse" width={4} height={4} />
              </div>
            ))}
          </div>
        </div>
      );
    };
    c.displayName = "CustomDayContent";
    return c;
  }, [selectedDay, workoutsByDay, currentMonthStart]);

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
          <span className={`${styles.attendance} heading-6`}>
            {progressPerMonth < 100 ? "출석 중" : "당신은 출석의 왕!"}
          </span>
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
        showOutsideDays
        fromYear={2024}
        toYear={now?.getFullYear()}
        weekStartsOn={1}
        locale={ko}
        formatters={{
          formatWeekdayName: (date: Date, options) => {
            return (
              <span
                className={`${styles.week} ${
                  getDay(date) === 0 || getDay(date) === 6
                    ? styles["week-weekend"]
                    : styles["week-weekdays"]
                }`}
              >
                {format(date, "EEE", options)}
              </span>
            );
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
            <div key={workout.id} role="group" className={styles.workout}>
              <span className={styles["workout-label"]}>
                {workout.category}
              </span>
              <span className={styles["workout-time"]}>
                {workout.start}-{workout.end}
              </span>
              <h2 className={`heading-6 ${styles["workout-title"]}`}>
                {workout.title}
              </h2>
              <p className={styles["workout-content"]}>{workout.content}</p>
              {workout.photo && (
                <img
                  className={styles["workout-image"]}
                  src={getPbImageUrl(workout, workout.photo)!}
                />
              )}
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
    <h2 className={styles["calendar-header"]}>
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <SVGIcon iconId="iconArrowsLeft" width={25} height={25} />
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className={`${styles.month} heading-4`}>
          {format(props.displayMonth, "M")}
        </span>
        <span className={styles.year}>
          {format(props.displayMonth, "yyyy")}
        </span>
      </div>

      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <SVGIcon iconId="iconArrowsRight" width={25} height={25} />
      </button>
    </h2>
  );
}
