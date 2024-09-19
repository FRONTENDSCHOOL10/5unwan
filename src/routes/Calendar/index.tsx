// import { useOutletContext } from "react-router-dom";
// import { UserContext } from "@/routes/PrivateRoute";
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
import styles from "./calendar.module.css";
import { getPbImageUrl } from "@/api/pocketbase";
import SVGIcon from "@/components/SVGicon";

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
        <div>
          <button
            className={
              selectedDay === dateTime
                ? styles["day-btn-selected"]
                : styles["day-btn"]
            }
            // style={{
            //   cursor: dayWorkouts.length === 0 ? "not-allowed" : "pointer",
            // }}
            onClick={() => setSelectedDay(dateTime)}
            disabled={dayWorkouts.length === 0}
          >
            <time className={styles.day} dateTime={dateTime}>
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
          <span className={`${styles.attendance} heading-6`}>출석 중</span>
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
        showOutsideDays
        fromYear={2024}
        toYear={now?.getFullYear()}
        weekStartsOn={1}
        locale={ko}
        formatters={{
          // formatMonthCaption: (date: Date) => format(date, "MMM"),
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
            <div key={workout.id}>
              <h2>{workout.title}</h2>
              <p>{workout.content}</p>
              {workout.photo ? (
                <img src={getPbImageUrl(workout, workout.photo)!} />
              ) : (
                <span>no-photo</span>
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
