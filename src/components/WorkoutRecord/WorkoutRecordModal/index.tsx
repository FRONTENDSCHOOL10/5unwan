import { Drawer } from "vaul";
import { useState, useEffect } from "react";
import { WorkoutRecordForm } from "@/components/WorkoutRecord/WorkoutRecordForm";
import styles from "@/components/WorkoutRecord/WorkoutRecordModal/workoutRecordModal.module.css";
import SVGIcon from "@/components/SVGicon";
import iconstyles from "@/components/SVGicon/styles.module.css";
import classNames from "classnames";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";
import { useToday, useWorkouts } from "@/hooks/useWorkouts";

export function WorkoutRecordModal() {
  const { isDark } = useDarkMode();
  const [modalOpen, setModalOpen] = useState(false);

  const { today } = useToday();
  const { workouts } = useWorkouts({
    startDay: today,
    endDay: today,
  });

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Drawer.Root dismissible={false} open={modalOpen}>
      <Drawer.Trigger asChild>
        <button
          onClick={handleOpen}
          type="button"
          disabled={workouts.length >= 3}
          className={`${iconstyles["gnb-icon-edit"]} ${workouts.length >= 3 ? styles["button-disabled"] : ""}`}
        >
          <SVGIcon
            iconId="iconSignatureSmall"
            width={20}
            height={20}
            color="var(--white)"
          />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <div className={classNames({ [styles["is-dark"]]: isDark })}>
          <Drawer.Overlay className={styles.overlay} />
          <Drawer.Content className={styles.outer}>
            <div className={styles.inner}>
              <span className={styles.handle}></span>
              <Drawer.Title>
                <p className={classNames("body-xl-bold", styles.title)}>
                  득근 기록하기
                </p>
              </Drawer.Title>
              <WorkoutRecordForm
                onSuccess={handleClose}
                onCancel={handleClose}
              />
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
